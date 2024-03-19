'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cropper, { Area } from 'react-easy-crop';
import { useFileUpload } from '@/app/shared/hooks/useFileUpload';
import { getZoomFromSliderData } from '@/app/profile/utils/getZoomFromSliderData';
import { getCroppedImg } from '@/app/profile/utils/getCroppedImg';
import { getRotationFromSliderValue } from '@/app/profile/utils/getRotationFromSliderValue';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { updateUserDetails } from '@/prismaActions/updateUser';
import { CONTAINER_STYLE, CROP_AREA_STYLE, PROFILE_SLIDER_MIDDLE } from '@/app/profile/constants';
import { CHAT_LIST } from '@/constants';
import { User } from '@/types';
import styles from './Profile.module.css';

export const Profile = ({ user }: { user: User }) => {
	const { push } = useRouter();

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({} as Area);
	const [zoomSliderValue, setZoomSliderValue] = useState(PROFILE_SLIDER_MIDDLE);
	const [rotationSliderValue, setRotationSliderValue] = useState(PROFILE_SLIDER_MIDDLE);
	const [username, setUsername] = useState(user.username || user.email);
	const [opacity, setOpacity] = useState(0);

	const { imageUrl, setImageUrl, dropImageUrl: dropUploadingHandler, selectFileHandler } = useFileUpload();

	const ref = useRef<HTMLLabelElement>(null);

	const dropHandler = () => {
		dropUploadingHandler();
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setRotation(0);
		setCroppedAreaPixels({} as Area);
		setZoomSliderValue(PROFILE_SLIDER_MIDDLE);
		setRotationSliderValue(PROFILE_SLIDER_MIDDLE);
		setUsername(user.username || user.email);
	};

	useEffect(() => {
		setZoom(getZoomFromSliderData(zoomSliderValue));
	}, [zoomSliderValue]);

	useEffect(() => {
		setRotation(getRotationFromSliderValue(rotationSliderValue));
	}, [rotationSliderValue]);

	const onCropComplete = (_: Area, area: Area) => setCroppedAreaPixels(area);

	const zoomSliderHandler = (evt: ChangeEvent<HTMLInputElement>) => setZoomSliderValue(+evt.target.value);

	const rotationSliderHandler = (evt: ChangeEvent<HTMLInputElement>) => setRotationSliderValue(+evt.target.value);

	const usernameHandler = (evt: ChangeEvent<HTMLInputElement>) => setUsername(evt.target.value);

	const redirectToChatList = () => push(CHAT_LIST);

	const submitHandler = async () => {
		const croppedImage = await getCroppedImg(imageUrl || user.imageUrl, croppedAreaPixels, rotation);
		setImageUrl(croppedImage);
		await updateUserDetails(user.id, username, croppedImage);
		redirectToChatList();
	};

	const uploadHandler = () => ref.current?.click();

	const deleteImageHandler = () => setImageUrl(null);

	return (
		<div>
			{opacity ? null : <FullScreenLoader />}
			<Cropper
				style={{ containerStyle: { ...CONTAINER_STYLE, opacity }, cropAreaStyle: CROP_AREA_STYLE }}
				image={imageUrl || user.imageUrl || undefined}
				crop={crop}
				zoom={zoom}
				rotation={rotation}
				aspect={1}
				zoomWithScroll={false}
				onCropChange={setCrop}
				onCropComplete={onCropComplete}
				onZoomChange={setZoom}
				onMediaLoaded={() => setOpacity(1)}
				cropShape="round"
			/>
			<div className={styles.controlsWrapper}>
				<div className={styles.buttonsWrapper}>
					<button className={styles.button} onClick={uploadHandler}>
						Upload
					</button>
					<button className={styles.button} onClick={dropHandler}>
						Reset
					</button>
					<button className={styles.button} onClick={deleteImageHandler}>
						Delete
					</button>
				</div>
				<label htmlFor="formId" ref={ref}>
					<input id="formId" type="file" onChange={selectFileHandler} accept="image/*" hidden />
				</label>
				<section className={styles.section}>
					<p className={styles.sliderName}>Zoom</p>
					<input
						type="range"
						value={zoomSliderValue}
						onChange={zoomSliderHandler}
						className={styles.slider}
					/>
				</section>
				<section className={styles.section}>
					<p className={styles.sliderName}>Rotation</p>
					<input
						type="range"
						value={rotationSliderValue}
						onChange={rotationSliderHandler}
						className={styles.slider}
					/>
				</section>
				<section className={styles.section}>
					<p className={styles.sliderName}>Username</p>
					<input value={username} onChange={usernameHandler} className={styles.input} />
				</section>
				<div className={styles.buttonsWrapper}>
					<button className={styles.button} onClick={submitHandler}>
						Update
					</button>
					<button className={styles.button} onClick={redirectToChatList}>
						Back
					</button>
				</div>
			</div>
		</div>
	);
};
