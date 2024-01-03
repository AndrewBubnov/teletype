'use client';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { Toast } from '@/app/chat/[chatId]/components/Toast';

export const ToastProvider = () => {
	const { toast, setToast } = useStore(state => ({
		toast: state.toast,
		setToast: state.setToast,
	}));

	return <Toast open={!!toast} onClose={() => setToast(null)} context={toast} />;
};
