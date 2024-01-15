import { useState } from 'react';
import { CloseIcon } from '@/app/chat/styled';
import { IconButton } from '@mui/material';
import {
	SelectedHeaderStub,
	DeleteIcon,
	SelectedCountWrapper,
	StyledCheckbox,
	StyledFormLabel,
	SelectedCount,
} from '@/app/shared/styled';
import { SelectModeHeaderProps } from '@/types';

export const SelectModeHeader = ({
	dropSelectMode,
	selectedNumber,
	onDelete,
	isAllSelected,
	toggleAllSelected,
}: SelectModeHeaderProps) =>
	selectedNumber ? (
		<>
			<SelectedCountWrapper>
				<IconButton onClick={dropSelectMode}>
					<CloseIcon />
				</IconButton>
				<SelectedCount>{selectedNumber}</SelectedCount>
				<StyledFormLabel
					control={<StyledCheckbox checked={isAllSelected} onChange={toggleAllSelected} />}
					label="Select all"
				/>
			</SelectedCountWrapper>
			<IconButton onClick={onDelete}>
				<DeleteIcon />
			</IconButton>
		</>
	) : (
		<SelectedHeaderStub />
	);
