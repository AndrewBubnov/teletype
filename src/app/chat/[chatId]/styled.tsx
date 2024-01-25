'use client';
import { styled } from '@mui/material/styles';
import { Box, Button, Checkbox, DialogContentText } from '@mui/material';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledButtonProps } from '@/types';

export const UnreadNumberButton = styled(Button)`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	bottom: 5%;
	right: 7%;
	animation: enter 1s;

	@keyframes enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
export const UnreadNumber = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	font-weight: 500;
	min-width: 1.8rem;
	height: 1.8rem;
	padding: 0.2rem;
	background: darkgreen;
	color: #fff;
	border-radius: 0.9rem;
	z-index: 10;
`;
export const UnreadNumberIconWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.5rem;
	height: 2.5rem;
	background: #fff;
	border-radius: 50%;
	margin-top: -0.5rem;
`;

export const UnreadNumberIcon = styled(DownIcon)`
	fill: darkgreen;
	margin-top: 3px;
`;

export const StyledButton = styled(({ textColor, ...props }: StyledButtonProps) => <Button {...props} />)`
	text-transform: none;
	color: ${({ textColor }) => (textColor ? textColor : 'currentColor')};
`;

export const StyledBlackCheckbox = styled(Checkbox)`
	color: #1a1a1a;
	margin-left: -0.75rem;

	&.Mui-checked {
		color: #1a1a1a;
	}
`;

export const StyledDialogContentText = styled(DialogContentText)`
	color: #000;
`;

export const StyledLink = styled('a')`
	color: lightgray;
`;
