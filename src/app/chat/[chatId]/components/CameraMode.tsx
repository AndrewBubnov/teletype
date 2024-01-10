import { usePhoto } from '@/app/chat/[chatId]/hooks/usePhoto';
import { LoadingIndicator } from '@/app/shared/styled';
import {
	CameraSwitchIcon,
	Canvas,
	CloseIcon,
	PhotoDialog,
	PhotoIconButton,
	PhotoIconsWrapper,
	SwitchCameraIconWrapper,
	TakePhotoIcon,
	VideoWrapper,
} from '@/app/chat/[chatId]/styled';
import { PHOTO_PAPER_PROPS } from '@/app/chat/[chatId]/constants';
import { CameraModeProps, FacingMode } from '@/types';

export const CameraMode = ({ open, onClose, onTakePhoto }: CameraModeProps) => {
	const { photoHandler, switchCameraHandler, videoRef, canvasRef, isStreaming, isMultipleDevices, facingMode } =
		usePhoto(onTakePhoto, onClose);

	const style = { transform: facingMode === FacingMode.USER ? 'rotateY(180deg)' : 'none' };

	return (
		<PhotoDialog fullWidth onClose={onClose} open={open} PaperProps={PHOTO_PAPER_PROPS}>
			{isStreaming ? null : <LoadingIndicator />}
			<VideoWrapper isStreaming={isStreaming}>
				<video muted playsInline autoPlay ref={videoRef} style={style} />
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
