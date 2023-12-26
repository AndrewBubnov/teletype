'use client';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { ErrorToast } from '@/app/chat/[chatId]/components/ErrorToast';

export const ToastProvider = () => {
	const { errorMessage, setErrorMessage } = useStore(state => ({
		errorMessage: state.errorMessage,
		setErrorMessage: state.setErrorMessage,
	}));

	return <ErrorToast open={!!errorMessage} onClose={() => setErrorMessage('')} text={errorMessage} />;
};
