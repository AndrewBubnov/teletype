import { RefObject } from 'react';

export const getVideoStream = async (
	videoRef: RefObject<HTMLVideoElement>,
	setErrorMessage: (arg: string) => void,
	setIsStreamed: (arg: boolean) => void
) => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		const video = videoRef.current;
		if (!video) return;
		video.srcObject = stream;
		video.play().then(() => setIsStreamed(true));
	} catch (error) {
		if (error instanceof Error) setErrorMessage(error.message);
	}
};
