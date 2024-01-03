import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';
import { LoadingIndicator } from '@/app/shared/styled';
import {
	Video,
	PhotoDialog,
	TakePhoto,
	VideoWrapper,
	Canvas,
	PhotoCloseWrapper,
	CloseIcon,
	NoPaddingIconButton,
} from '@/app/chat/[chatId]/styled';
import { PHOTO_PAPER_PROPS } from '@/app/chat/[chatId]/constants';
import { CameraModeProps } from '@/types';

export const CameraMode = ({ open, onClose, onTakePhoto }: CameraModeProps) => {
	const setErrorMessage = useStore(state => state.setErrorMessage);

	const [isStreamed, setIsStreamed] = useState(false);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then(stream => {
				const video = videoRef.current;
				if (!video) return;
				const handler = () => {
					setWidth(video.videoWidth);
					setHeight(video.videoHeight);
				};
				video.addEventListener('canplay', handler);
				video.srcObject = stream;
				video.play().then(() => {
					setIsStreamed(true);
					video.removeEventListener('canplay', handler);
				});
			})
			.catch(error => {
				if (error instanceof Error) setErrorMessage(error.message);
			});
	}, [setErrorMessage]);

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

	return (
		<PhotoDialog fullWidth onClose={onClose} open={open} PaperProps={PHOTO_PAPER_PROPS}>
			{isStreamed ? null : <LoadingIndicator />}
			<VideoWrapper isStreamed={isStreamed}>
				<PhotoCloseWrapper>
					<NoPaddingIconButton onClick={onClose}>
						<CloseIcon />
					</NoPaddingIconButton>
				</PhotoCloseWrapper>
				<Video ref={videoRef} />
				<TakePhoto onClick={photoHandler} />
			</VideoWrapper>
			<Canvas ref={canvasRef} />
		</PhotoDialog>
	);
};
