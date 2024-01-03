'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFileUpload } from '@/app/shared/hooks/useFileUpload';
import Cropper, { Area } from 'react-easy-crop';
import { Box, FormLabel, Slider } from '@mui/material';
import { Button } from '@mui/joy';
import { CONTAINER_STYLE, CROP_AREA_STYLE, INPUT_STYLE, PROFILE_SLIDER_MIDDLE } from '@/app/profile/constants';
import { getZoomFromSliderData } from '@/app/profile/utils/getZoomFromSliderData';
import { getCroppedImg } from '@/app/profile/utils/getCroppedImg';
import { getRotationFromSliderValue } from '@/app/profile/utils/getRotationFromSliderValue';
import { StyledInput } from '@/app/chat/styled';
import { updateUserDetails } from '@/actions/updateUser';
import { ButtonsWrapper, ControlsWrapper, LoaderWrapper, StyledTypography } from '@/app/profile/styled';
import { useRouter } from 'next/navigation';
import { LoadingIndicator } from '@/app/shared/styled';
import { CHAT_LIST } from '@/constants';
import { User } from '@/types';

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

	const redirectToChatList = () => push(CHAT_LIST);

	const submitHandler = async () => {
		const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
		setImageUrl(croppedImage);
		await updateUserDetails(user.id, username, croppedImage);
		redirectToChatList();
	};

	const uploadHandler = () => ref.current?.click();

	const deleteImageHandler = () => setImageUrl(null);

	return (
		<Box>
			{opacity ? null : (
				<LoaderWrapper>
					<LoadingIndicator />
				</LoaderWrapper>
			)}
			<Cropper
				style={{ containerStyle: { ...CONTAINER_STYLE, opacity }, cropAreaStyle: CROP_AREA_STYLE }}
				image={imageUrl || undefined}
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
			<ControlsWrapper>
				<ButtonsWrapper>
					<Button size="sm" onClick={uploadHandler}>
						Upload
					</Button>
					<Button size="sm" onClick={dropUploadingHandler}>
						Reset
					</Button>
					<Button size="sm" onClick={deleteImageHandler}>
						Delete
					</Button>
				</ButtonsWrapper>
				<FormLabel htmlFor="formId" ref={ref}>
					<input id="formId" type="file" onChange={selectFileHandler} accept="image/*" hidden />
				</FormLabel>
				<StyledTypography>Zoom</StyledTypography>
				<Slider value={zoomSliderValue} onChange={zoomSliderHandler} size="small" />
				<StyledTypography>Rotation</StyledTypography>
				<Slider value={rotationSliderValue} onChange={rotationSliderHandler} size="small" />
				<StyledTypography>Username</StyledTypography>
				<StyledInput value={username} onChange={usernameHandler} sx={INPUT_STYLE} />
				<ButtonsWrapper>
					<Button onClick={submitHandler}>Update</Button>
					<Button onClick={redirectToChatList}>Back to chat list</Button>
				</ButtonsWrapper>
			</ControlsWrapper>
		</Box>
	);
};
