import { clsx } from 'clsx';
import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { SelectModeHeaderProps } from '@/types';
import styles from '../shared.module.css';
import { FadeContext } from '@/app/shared/components/Fade';
import { useContext } from 'react';

export const SelectModeHeader = ({
	dropSelectMode,
	selectedNumber,
	isAllSelected,
	toggleAllSelected,
	className = '',
	withPadding,
}: SelectModeHeaderProps) => {
	const { onTransitionEnd } = useContext(FadeContext);
	return (
		<div className={clsx(className, { [styles.withPadding]: withPadding })} onTransitionEnd={onTransitionEnd}>
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
		</div>
	);
};
