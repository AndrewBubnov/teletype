import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import styles from '../shared.module.css';
import { SelectModeHeaderProps } from '@/types';

export const SelectModeHeader = ({
	dropSelectMode,
	selectedNumber,
	onDelete,
	isAllSelected,
	toggleAllSelected,
}: SelectModeHeaderProps) =>
	selectedNumber ? (
		<div className={styles.selectModeHeaderWrapper}>
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
		</div>
	) : (
		<div className={styles.selectedHeaderStub} />
	);
