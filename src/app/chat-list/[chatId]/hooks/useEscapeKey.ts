import { useEffect } from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keydown';

export const useEscapeKey = (onClose: () => void) => {
	useEffect(() => {
		const handler = (evt: KeyboardEvent) => {
			if (evt.key === KEY_NAME_ESC) onClose();
		};
		window.addEventListener(KEY_EVENT_TYPE, handler);
		return () => window.removeEventListener(KEY_EVENT_TYPE, handler);
	}, [onClose]);
};
