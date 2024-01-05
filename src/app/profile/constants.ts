import { CropperProps } from 'react-easy-crop';

export const PROFILE_SLIDER_MIDDLE = 50;

export const CONTAINER_STYLE: CropperProps['style']['containerStyle'] = {
	position: 'relative',
	left: '1rem',
	height: '50vh',
	width: 'calc(100vw - 2rem)',
	transition: 'opacity .2s',
};

export const CROP_AREA_STYLE: CropperProps['style']['cropAreaStyle'] = { boxShadow: 'none' };
export const INPUT_STYLE = { display: 'flex', margin: '1rem auto 2rem auto' };
export const UPLOAD_FILE_ERROR_MESSAGE = 'Max file size of 1MB exceeded';
