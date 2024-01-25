'use client';
import { styled } from '@mui/material/styles';
import { Box, Button, Checkbox, DialogContentText } from '@mui/material';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledButtonProps } from '@/types';

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
