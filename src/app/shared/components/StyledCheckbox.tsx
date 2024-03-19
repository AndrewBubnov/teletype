import { clsx } from 'clsx';
import { useFadeContext } from '@/app/shared/hooks/useFadeContext';
import { StyledCheckboxProps } from '@/types';
import styles from '@/app/shared/shared.module.css';

export const StyledCheckbox = ({ id, checked, label, onChange, className = '' }: StyledCheckboxProps) => {
	const { onTransitionEnd } = useFadeContext();
	return (
		<label className={styles.checkboxWrapper} htmlFor={id} onTransitionEnd={onTransitionEnd}>
			<input
				type="checkbox"
				className={clsx(styles.checkbox, className, { [styles.checkboxNoLabel]: !label })}
				id={id}
				checked={checked}
				onChange={onChange}
				readOnly={!onChange}
			/>
			{label && <span className={styles.formLabel}>{label}</span>}
		</label>
	);
};
