import { usePhoto } from '@/app/chat/[chatId]/hooks/usePhoto';
import { LoadingIndicator } from '@/app/shared/styled';
import {
	PhotoDialog,
	VideoWrapper,
	Canvas,
	PhotoIconsWrapper,
	CloseIcon,
	PhotoIconButton,
	CameraSwitchIcon,
	TakePhotoIcon,
	SwitchCameraIconWrapper,
} from '@/app/chat/[chatId]/styled';
import { PHOTO_PAPER_PROPS } from '@/app/chat/[chatId]/constants';
import { CameraModeProps } from '@/types';

export const CameraMode = ({ open, onClose, onTakePhoto }: CameraModeProps) => {
	const { photoHandler, switchCameraHandler, videoRef, canvasRef, isStreaming, isMultipleDevices } = usePhoto(
		onTakePhoto,
		onClose
	);
	return (
		<PhotoDialog fullWidth onClose={onClose} open={open} PaperProps={PHOTO_PAPER_PROPS}>
			{isStreaming ? null : <LoadingIndicator />}
			<VideoWrapper isStreaming={isStreaming}>
				<video muted playsInline autoPlay ref={videoRef} />
				<PhotoIconsWrapper>
					<PhotoIconButton onClick={onClose}>
						<CloseIcon />
					</PhotoIconButton>
					<PhotoIconButton onClick={photoHandler}>
						<TakePhotoIcon />
					</PhotoIconButton>
					<SwitchCameraIconWrapper>
						{isMultipleDevices ? (
							<PhotoIconButton onClick={switchCameraHandler}>
								<CameraSwitchIcon />
							</PhotoIconButton>
						) : null}
					</SwitchCameraIconWrapper>
				</PhotoIconsWrapper>
			</VideoWrapper>
			<Canvas ref={canvasRef} />
		</PhotoDialog>
	);
};
