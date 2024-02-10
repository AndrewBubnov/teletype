import { timeUnits } from '@/app/chat-list/[chatId]/constants';

export const getElapsedTimeDetails = (date: Date): { unit: keyof typeof timeUnits; unitNumber: number } => {
	const elapsed = Date.now() - Date.parse(date.toString());
	const biggestUnit = (Object.keys(timeUnits) as Array<keyof typeof timeUnits>).filter(
		unit => Math.abs(elapsed) > timeUnits[unit] || unit == 'second'
	)[0];
	return { unit: biggestUnit, unitNumber: Math.round(elapsed / timeUnits[biggestUnit]) };
};
