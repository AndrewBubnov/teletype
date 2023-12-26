'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Box, FormLabel, Slider, Typography } from '@mui/material';
import { Button } from '@mui/joy';
import { PROFILE_SLIDER_MIDDLE } from '@/app/profile/constants';
import { getZoomFromSliderData } from '@/app/profile/utils/getZoomFromSliderData';
import { getCroppedImg } from '@/app/profile/utils/getCroppedImg';
import { getRotationFromSliderValue } from '@/app/profile/utils/getRotationFromSliderValue';
import { StyledInput } from '@/app/chat/styled';
import { updateUserDetails } from '@/actions/updateUser';
import { User } from '@/types';
import { MAX_FILE_SIZE } from '@/app/chat/[chatId]/constants';
import { fileInputHelper } from '@/app/chat/[chatId]/utils/fileInputHelper';
import { useStore } from '@/store';

export const Profile = ({ user }: { user: User }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({} as Area);
	const [zoomSliderValue, setZoomSliderValue] = useState(PROFILE_SLIDER_MIDDLE);
	const [rotationSliderValue, setRotationSliderValue] = useState(PROFILE_SLIDER_MIDDLE);
	const [imageUrl, setImageUrl] = useState(user.imageUrl);
	const [username, setUsername] = useState(user.username);

	const ref = useRef<HTMLLabelElement>(null);

	const setErrorMessage = useStore(state => state.setErrorMessage);

	useEffect(() => {
		setZoom(getZoomFromSliderData(zoomSliderValue));
	}, [zoomSliderValue]);

	useEffect(() => {
		setRotation(getRotationFromSliderValue(rotationSliderValue));
	}, [rotationSliderValue]);

	const onCropComplete = (_: Area, area: Area) => setCroppedAreaPixels(area);

	const zoomSliderHandler = (_: Event, value: number | number[]) => setZoomSliderValue(value as number);

	const rotationSliderHandler = (_: Event, value: number | number[]) => setRotationSliderValue(value as number);

	const usernameHandler = (evt: ChangeEvent<HTMLInputElement>) => setUsername(evt.target.value);

	const submitHandler = async () => {
		const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
		setImageUrl(croppedImage);
		await updateUserDetails(user.id, username, croppedImage);
		setRotationSliderValue(PROFILE_SLIDER_MIDDLE);
		setZoomSliderValue(PROFILE_SLIDER_MIDDLE);
	};

	const selectFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if ((event.target.files?.[0].size || 0) > MAX_FILE_SIZE) {
			setErrorMessage('Max file size of 700Kb exceeded');
			event.target.value = '';
			return;
		}
		fileInputHelper(event, (imgUrl: string) => setImageUrl(imgUrl));
	};

	const uploadHandler = () => ref.current?.click();

	const dropUploadingHandler = () => setImageUrl(user.imageUrl);

	const deleteImageHandler = () => setImageUrl(null);

	return (
		<Box>
			<Box style={{ position: 'relative', top: '1rem', left: '1rem', height: '50vh' }}>
				<Cropper
					style={{ containerStyle: { height: '50vh', width: 'calc(100vw - 2rem)' } }}
					image={imageUrl || undefined}
					crop={crop}
					zoom={zoom}
					rotation={rotation}
					aspect={1}
					zoomWithScroll={false}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</Box>
			<Box style={{ width: '75%', margin: '2rem auto' }}>
				<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '2rem' }}>
					<Button size="sm" onClick={uploadHandler}>
						Upload
					</Button>
					<Button size="sm" onClick={dropUploadingHandler}>
						Reset
					</Button>
					<Button size="sm" onClick={deleteImageHandler}>
						Delete
					</Button>
				</div>
				<FormLabel htmlFor="formId" ref={ref}>
					<input id="formId" type="file" onChange={selectFileHandler} accept="image/*" hidden />
				</FormLabel>
				<Typography style={{ textAlign: 'center' }}>Zoom</Typography>
				<Slider value={zoomSliderValue} onChange={zoomSliderHandler} size="small" />
				<Typography style={{ textAlign: 'center' }}>Rotation</Typography>
				<Slider value={rotationSliderValue} onChange={rotationSliderHandler} size="small" />
				<Typography style={{ textAlign: 'center' }}>Username</Typography>
				<StyledInput
					value={username}
					onChange={usernameHandler}
					sx={{ display: 'flex', width: '100%', margin: '1rem auto 2rem auto' }}
				/>
				<Button onClick={submitHandler}>Update</Button>
			</Box>
		</Box>
	);
};
