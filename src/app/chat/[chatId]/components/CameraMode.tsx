import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '@/store';
import { LoadingIndicator } from '@/app/shared/styled';
import {
	Video,
	PhotoDialog,
	VideoWrapper,
	Canvas,
	PhotoIconsWrapper,
	CloseIcon,
	NoPaddingIconButton,
	CameraSwitchIcon,
} from '@/app/chat/[chatId]/styled';
import { getVideoDevices } from '@/app/chat/[chatId]/utils/getVideoDevices';
import { PHOTO_PAPER_PROPS } from '@/app/chat/[chatId]/constants';
import { CameraModeProps } from '@/types';

export const CameraMode = ({ open, onClose, onTakePhoto }: CameraModeProps) => {
	const setToast = useStore(state => state.setToast);

	const [isStreamed, setIsStreamed] = useState(false);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [deviceIds, setDeviceIds] = useState<string[]>([]);
	const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const constraints = useMemo(
		() => ({
			video: {
				deviceId: {
					exact: deviceIds[0],
				},
			},
			audio: false,
		}),
		[deviceIds]
	);

	useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then(devices => setDeviceIds(getVideoDevices(devices)));
	}, []);

	useEffect(() => {
		let canceled = false;
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => {
				if (canceled) return;
				const video = videoRef.current;

				if (!video) return;

				setVideoStream(stream);
				const handler = () => {
					setWidth(video.videoWidth);
					setHeight(video.videoHeight);
					video.play().then(() => {
						setIsStreamed(true);
					});
					video.removeEventListener('canplay', handler);
				};

				video.addEventListener('canplay', handler);

				video.srcObject = stream;
			})
			.catch(error => {
				if (error instanceof Error) setToast({ text: error.message, type: 'error' });
			});
		return () => {
			canceled = true;
		};
	}, [constraints, setToast]);

	useEffect(
		() => () => {
			if (videoStream) videoStream.getTracks().forEach(track => track.stop());
		},
		[videoStream]
	);

	const photoHandler = () => {
		const canvas = canvasRef.current;
		const video = videoRef.current;
		if (!canvas || !video) return;
		const context = canvas.getContext('2d');
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			context?.drawImage(video, 0, 0, width, height);
			const data = canvas.toDataURL('image/jpg');
			onTakePhoto(data);
			onClose();
		}
	};

	const switchCameraHandler = () => {
		if (videoStream) videoStream.getTracks().forEach(track => track.stop());
		const [first, second] = deviceIds;
		setDeviceIds([second, first]);
	};

	return (
		<PhotoDialog fullWidth onClose={onClose} open={open} PaperProps={PHOTO_PAPER_PROPS}>
			{isStreamed ? null : <LoadingIndicator />}
			<VideoWrapper isStreamed={isStreamed}>
				<Video ref={videoRef} onClick={photoHandler} />
				<PhotoIconsWrapper>
					<NoPaddingIconButton onClick={onClose}>
						<CloseIcon />
					</NoPaddingIconButton>
					{deviceIds.length > 1 ? (
						<NoPaddingIconButton onClick={switchCameraHandler}>
							<CameraSwitchIcon />
						</NoPaddingIconButton>
					) : null}
				</PhotoIconsWrapper>
			</VideoWrapper>
			<Canvas ref={canvasRef} />
		</PhotoDialog>
	);
};
