import { ChangeEvent } from 'react';
import { UploadFileIcon, UploadLabel } from '@/app/chat/[chatId]/styled';

export const FileUploadInput = ({ onChange }: { onChange(event: ChangeEvent<HTMLInputElement>): void }) => (
	<UploadLabel htmlFor="formId">
		<UploadFileIcon />
		<input id="formId" type="file" onChange={onChange} accept="image/*" hidden />
	</UploadLabel>
);
