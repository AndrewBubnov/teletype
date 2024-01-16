import { useEffect, useMemo, useRef, useState } from 'react';
import { useCommonStore } from '@/store';
import { FacingMode } from '@/types';

export const usePhoto = (
	onTakePhoto: (arg: string) => void,
	onClose: (evt?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
) => {
	const setToast = useCommonStore(state => state.setToast);

	const [isStreaming, setIsStreaming] = useState(false);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [facingMode, setFacingMode] = useState<FacingMode>(FacingMode.USER);
	const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const constraints = useMemo(
		() => ({
			video: { facingMode: { exact: facingMode } },
			audio: false,
		}),
		[facingMode]
	);

	const isMultipleDevices = useMemo(() => window.matchMedia('(max-width: 767px)').matches, []);

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
						setIsStreaming(true);
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
		setFacingMode(prevState => (prevState === FacingMode.USER ? FacingMode.ENVIRONMENT : FacingMode.USER));
	};

	return { photoHandler, switchCameraHandler, videoRef, canvasRef, isStreaming, isMultipleDevices, facingMode };
};
