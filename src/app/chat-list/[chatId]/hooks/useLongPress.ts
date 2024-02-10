import { useCallback, useRef, useState, PointerEvent } from 'react';
import { UseLongPress } from '@/types';

const preventDefault = (event: Event) => event.preventDefault();

export const useLongPress = ({ onLongPress, onPress = () => null, delay = 200 }: UseLongPress) => {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const timeout = useRef<number | undefined>();
	const target = useRef<EventTarget | null>();

	const start = useCallback(
		(event: PointerEvent) => {
			if (event.target) {
				event.target.addEventListener('pointerup', preventDefault, { passive: false });
				target.current = event.target;
			}
			timeout.current = window.setTimeout(() => {
				onLongPress(event);
				setLongPressTriggered(true);
			}, delay);
		},
		[onLongPress, delay]
	);

	const clear = useCallback(
		(event: PointerEvent, shouldTriggerClick = true) => {
			timeout.current && window.clearTimeout(timeout.current);
			shouldTriggerClick && !longPressTriggered && onPress(event);
			setLongPressTriggered(false);
			if (target.current) target.current.removeEventListener('pointerup', preventDefault);
		},
		[onPress, longPressTriggered]
	);

	return {
		onPointerDown: start,
		onPointerUp: clear,
		onPointerLeave: (e: PointerEvent) => clear(e, false),
	};
};
