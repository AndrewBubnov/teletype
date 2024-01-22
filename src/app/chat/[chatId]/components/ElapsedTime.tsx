'use client';
import { useEffect, useMemo, useState } from 'react';
import { useIsDomLoaded } from '@/app/chat/[chatId]/hooks/useIsDomLoaded';
import { getElapsedTimeDetails } from '@/app/chat/[chatId]/utils/getElapsedTimeDetails';
import { timeUnitDuration, timeUnits } from '@/app/chat/[chatId]/constants';

export const ElapsedTime = ({ lastSeen, prefix }: { lastSeen: Date; prefix: string }) => {
	const [unit, setUnit] = useState<keyof typeof timeUnits>(getElapsedTimeDetails(lastSeen).unit);
	const [unitNumber, setUnitNumber] = useState<number>(getElapsedTimeDetails(lastSeen).unitNumber);

	const isDomLoaded = useIsDomLoaded();

	const elapsedString = useMemo<string>(
		() => `${unitNumber} ${unit}${unitNumber > 1 ? 's' : ''} ago`,
		[unitNumber, unit]
	);

	useEffect(() => {
		const timeout = window.setTimeout(
			() =>
				setUnitNumber(prevState => {
					const updated = prevState + 1;
					if (updated === timeUnitDuration[unit]) {
						setUnit(getElapsedTimeDetails(lastSeen).unit);
						setUnitNumber(getElapsedTimeDetails(lastSeen).unitNumber);
					}
					return updated;
				}),
			timeUnits[unit]
		);
		return () => clearTimeout(timeout);
	}, [lastSeen, unit, unitNumber]);

	if (!isDomLoaded) return null;

	return `${prefix}, last seen ${elapsedString}`;
};
