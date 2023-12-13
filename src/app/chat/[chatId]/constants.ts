export const options = {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false,
} as const;

export const timeUnits = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
};

export const timeUnitDuration = {
	year: 12,
	month: 30,
	day: 24,
	hour: 60,
	minute: 60,
	second: 60,
};

export const smiles = [
	'1f600',
	'1f606',
	'1f923',
	'1f609',
	'1f61c',
	'1f644',
	'1f9d0',
	'1f641',
	'1f4af',
	'1f4a5',
	'1f626',
	'1f44d',
];
