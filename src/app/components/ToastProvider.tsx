'use client';
import { useStore } from '@/store';
import { Toast } from '@/app/components/Toast';

export const ToastProvider = () => {
	const { toast, setToast } = useStore(state => ({
		toast: state.toast,
		setToast: state.setToast,
	}));

	return <Toast open={!!toast} onClose={() => setToast(null)} context={toast} />;
};
