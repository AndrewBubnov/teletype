import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md';
import { SelectModeHeaderProps } from '@/types';
import styles from '../shared.module.css';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';

export const SelectModeHeader = ({
	dropSelectMode,
	selectedNumber,
	onDelete,
	isAllSelected,
	toggleAllSelected,
}: SelectModeHeaderProps) =>
	selectedNumber ? (
		<>
			<div className={styles.selectedCountWrapper}>
				<button className={styles.iconButton} onClick={dropSelectMode}>
					<CloseIcon />
				</button>
				<div className={styles.selectedCount}>{selectedNumber}</div>
				<div className={styles.formLabel}>
					<StyledCheckbox
						id="all_selected"
						checked={isAllSelected}
						onChange={toggleAllSelected}
						label="Select all"
					/>
				</div>
			</div>
			<button className={styles.iconButton} onClick={onDelete}>
				<DeleteIcon />
			</button>
		</>
	) : (
		<div className={styles.selectedHeaderStub} />
	);
