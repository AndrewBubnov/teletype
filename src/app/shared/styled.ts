import { styled } from '@mui/material/styles';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
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
export const SelectedHeaderStub = styled(Box)`
	height: 2.5rem;
`;
export const SelectedCountWrapper = styled(Box)`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	color: #fff;
	margin-left: 0.8rem;
`;

export const SelectedCount = styled(Box)`
	width: 1rem;
`;
export const StyledCheckbox = styled(Checkbox)`
	color: #fff;
	padding: 0;
	font-size: 1.2rem;

	&.Mui-checked {
		color: #fff;
	}
`;
export const StyledFormLabel = styled(FormControlLabel)`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	margin-left: 1rem;
`;
