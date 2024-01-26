'use client';
import { useCallback } from 'react';
import { useCommonStore } from '@/store';
import { Toast } from '@/app/components/Toast';

export const ToastProvider = () => {
	const { text, setToast } = useCommonStore(state => ({
		text: state.errorToastText,
		setToast: state.setErrorToastText,
	}));

	const onClose = useCallback(() => setToast(''), [setToast]);

	if (!text) return null;

	return <Toast onClose={onClose} text={text} />;
};
