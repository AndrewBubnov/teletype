import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@mui/material';
import { useStore } from '@/store';
import { getVideoStream } from '@/app/chat/[chatId]/utils/getVideoStream';

import { LoaderWrapper, LoadingIndicator } from '@/app/shared/styled';
import { TakePhoto, VideoWrapper } from '@/app/chat/[chatId]/styled';

export const PhotoModal = ({ open, onClose }: { open: boolean; onClose(): void }) => {
	const setErrorMessage = useStore(state => state.setErrorMessage);
	const [isStreamed, setIsStreamed] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		getVideoStream(videoRef, setErrorMessage, setIsStreamed).then();
	}, [setErrorMessage]);

	return (
		<>
			<LoaderWrapper>
				<LoadingIndicator />
			</LoaderWrapper>
			<Dialog
				fullWidth
				sx={{ opacity: isStreamed ? 1 : 0, transition: 'opacity 0.5s' }}
				onClose={onClose}
				open={open}
				PaperProps={{ style: { background: 'transparent' } }}
			>
				<VideoWrapper>
					<video ref={videoRef} />
					<TakePhoto />
				</VideoWrapper>
				{/*<canvas ref={canvasRef} />*/}
			</Dialog>
		</>
	);
};
