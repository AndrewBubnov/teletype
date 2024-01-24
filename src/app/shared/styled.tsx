import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { UserPhotoImageProps } from '@/types';
import Image from 'next/image';

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
