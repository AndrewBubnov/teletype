'use client';
import { useCallback } from 'react';
import { useCommonStore } from '@/store';
import { Toast } from '@/app/components/Toast';

export const ToastProvider = () => {
	const { toast, setToast } = useCommonStore(state => ({
		toast: state.toast,
		setToast: state.setToast,
	}));

	const onClose = useCallback(() => setToast(null), [setToast]);

	if (!toast) return null;

	return <Toast onClose={onClose} context={toast} />;
};
