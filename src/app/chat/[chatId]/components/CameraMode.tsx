import { usePhoto } from '@/app/chat/[chatId]/hooks/usePhoto';
import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { RiCameraLensLine as TakePhotoIcon } from 'react-icons/ri';
import { MdOutlineCameraswitch as CameraSwitchIcon } from 'react-icons/md';
import { Dialog } from '@/app/chat/[chatId]/components/Dialog';
import { StyledElement } from '@/app/chat/[chatId]/components/StyledElement';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { CameraModeProps, FacingMode } from '@/types';
import styles from '../chatId.module.css';

export const CameraMode = ({ isOpen, onClose, onTakePhoto }: CameraModeProps) => {
	const { photoHandler, switchCameraHandler, videoRef, canvasRef, isStreaming, isMultipleDevices, facingMode } =
		usePhoto(onTakePhoto, onClose);

	const style = { transform: facingMode === FacingMode.USER ? 'rotateY(180deg)' : 'none' };

	return (
		<Dialog onClose={onClose} isOpen={isOpen}>
			{isStreaming ? null : <FullScreenLoader />}
			<StyledElement element="div" className="videoWrapper" styles={styles} attributes={{ isStreaming }}>
				<video muted playsInline autoPlay ref={videoRef} className={styles.video} style={style} />
				<div className={styles.photoIconsWrapper}>
					<button className={styles.photoIconButton} onClick={onClose}>
						<CloseIcon />
					</button>
					<button className={styles.photoIconButton} onClick={photoHandler}>
						<TakePhotoIcon />
					</button>
					<div className={styles.switchCameraIconWrapper}>
						{isMultipleDevices ? (
							<button className={styles.photoIconButton} onClick={switchCameraHandler}>
								<CameraSwitchIcon />
							</button>
						) : null}
					</div>
				</div>
			</StyledElement>
			<canvas ref={canvasRef} className={styles.canvas} />
		</Dialog>
	);
};
