import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from '../chatId.module.css';
import { TextAreaProps } from '@/types';

export const TextArea = ({ minRows, maxRows, startDecorator, endDecorator, value, onChange }: TextAreaProps) => {
	const [rows, setRows] = useState(minRows || 1);

	const ref = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (!(ref && 'current' in ref)) return;
		const textarea = ref.current;
		if (!textarea) return;
		textarea.style.height = '1px';
		const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
		const linesNumber = Math.floor(textarea.scrollHeight / lineHeight);
		const updatedRows = Math.min(maxRows, Math.max(minRows, linesNumber));
		textarea.style.height = `calc(${lineHeight * updatedRows}px + 1rem)`;
		setRows(updatedRows);
	}, [maxRows, minRows, value]);

	const changeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => onChange(evt);

	return (
		<div className={styles.textAreaWrapper}>
			{startDecorator}
			<textarea
				ref={ref}
				value={value}
				onChange={changeHandler}
				className={styles.textArea}
				rows={rows}
				placeholder="Type in here.."
			/>
			{endDecorator}
		</div>
	);
};

TextArea.displayName = 'TextArea';
