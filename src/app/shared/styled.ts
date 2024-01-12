import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
export const DeleteIcon = styled(DeleteOutlineIcon)`
	fill: #fff;
`;
