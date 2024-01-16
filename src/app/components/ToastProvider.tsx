'use client';
import { useCommonStore } from '@/store';
import { Toast } from '@/app/components/Toast';

export const ToastProvider = () => {
	const { toast, setToast } = useCommonStore(state => ({
		toast: state.toast,
		setToast: state.setToast,
	}));

	return <Toast open={!!toast} onClose={() => setToast(null)} context={toast} />;
};
