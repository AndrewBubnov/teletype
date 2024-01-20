import { styled } from '@mui/material/styles';
import { Box, Checkbox, TextField } from '@mui/material';
import { UserPhotoImageProps } from '@/types';
import Image from 'next/image';

export const LoadingIndicator = styled(Box)`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid #fff;
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
	margin: auto;

	@keyframes rotation {
		to {
			transform: rotate(360deg);
		}
	}
`;
export const LoaderWrapper = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '70vh',
}));

export const StyledCheckbox = styled(Checkbox)`
	color: #fff;
	padding: 0;
	font-size: 1.2rem;

	&.Mui-checked {
		color: #fff;
	}
`;
export const UserPhotoImage = styled(({ size = 50, ...props }: UserPhotoImageProps) => (
	<Image width={size} height={size} {...props} alt={props.alt} quality={100} />
))`
	border-radius: 50%;
	margin-right: 0.5rem;
	object-fit: cover;
`;
export const StyledInput = styled(TextField)({
	'width': '100%',
	'& label': {
		color: 'lightgray',
	},
	'& label.Mui-focused': {
		color: '#fff',
	},
	'& .MuiOutlinedInput-root': {
		'color': '#fff',
		'& fieldset': {
			borderColor: 'lightgray',
		},
		'&:hover fieldset': {
			borderColor: '#fff',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#fff',
		},
		'.MuiSvgIcon-root': {
			fill: 'lightgray',
		},
	},
});
export const StyledLabel = styled('label')`
	display: contents;

	&:nth-of-type(1) > div {
		padding-top: 0;
	}
`;
