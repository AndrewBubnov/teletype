import { ChangeEvent } from 'react';
import { GoPaperclip as UploadFileIcon } from 'react-icons/go';
import styles from '../chatId.module.css';

export const FileUploadInput = ({ onChange }: { onChange(event: ChangeEvent<HTMLInputElement>): void }) => (
	<label className={styles.fileUpload} htmlFor="formId">
		<UploadFileIcon fontSize="1.5rem" />
		<input id="formId" type="file" onChange={onChange} accept="image/*" hidden />
	</label>
);
