import { useContext } from 'react';
import { clsx } from 'clsx';
import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { FadeContext } from '@/app/shared/components/Fade';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { SelectModeHeaderProps } from '@/types';
import styles from '../shared.module.css';

export const SelectModeHeader = ({
	dropSelectMode,
	selectedNumber,
	isAllSelected,
	toggleAllSelected,
	onDelete,
	className = '',
	withPadding,
}: SelectModeHeaderProps) => {
	const { onTransitionEnd } = useContext(FadeContext);
	return (
		<div
			className={clsx(styles.selectedCountWrapper, className, { [styles.withPadding]: withPadding })}
			onTransitionEnd={onTransitionEnd}
		>
			<div className={styles.flex}>
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
	);
};
