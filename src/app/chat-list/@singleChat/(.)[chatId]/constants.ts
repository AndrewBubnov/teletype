export const timeOptions = {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false,
} as const;

export const dateOptions = {
	month: 'long',
	day: 'numeric',
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

export const reactions = [
	'1f44d',
	'1f600',
	'1f606',
	'1f923',
	'1f61c',
	'1f644',
	'1f9d0',
	'1f641',
	'1F621',
	'1f4af',
	'1f4a5',
	'1F525',
];

export const MAX_MESSAGE_WIDTH_RATIO = 5 / 6;
export const MAX_FILE_SIZE = 1000_000;
export const DEFAULT_IMAGE_WIDTH = 350;
export const DIALOG_MARGINS = 64;
export const ENLARGE_RATIO = 0.6;
export const MOBILE_WIDTH = 600;
export const TEXT_AREA_STYLE = {
	'width': '100%',
	'background': 'rgba(255,255,255, 0.05)',
	'color': 'lightgray',
	'--Textarea-focusedHighlight': 'lightgray !important',
};

export const urlRegex = /\b(?:https?|http|www)\:\/\/[^\s/$.?#].[^\s]*/gi;

export const DELETE_SINGLE_MESSAGE = 'Are you sure you want to delete this message?';
export const DELETE_MULTIPLE_MESSAGE = 'Are you sure you want to delete these messages?';
export const CANCEL_IS_TYPING_DELAY = 5000;
