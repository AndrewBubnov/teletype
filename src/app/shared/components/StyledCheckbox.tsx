import styles from '@/app/shared/shared.module.css';
import { clsx } from 'clsx';
import { StyledCheckboxProps } from '@/types';
import { useContext } from 'react';
import { FadeContext } from '@/app/shared/components/Fade';

export const StyledCheckbox = ({ id, checked, label, onChange, className = '' }: StyledCheckboxProps) => {
	const { onTransitionEnd } = useContext(FadeContext);
	return (
		<label className={styles.checkboxWrapper} htmlFor={id} onTransitionEnd={onTransitionEnd}>
			<input
				type="checkbox"
				className={clsx(styles.checkbox, className)}
				id={id}
				checked={checked}
				onChange={onChange}
				readOnly={!onChange}
			/>
			{label && <span>{label}</span>}
		</label>
	);
};
