import { PROFILE_SLIDER_MIDDLE } from '@/app/profile/constants';

export const getZoomFromSliderData = (sliderData: number) =>
	sliderData > PROFILE_SLIDER_MIDDLE
		? sliderData / PROFILE_SLIDER_MIDDLE
		: 1 / 2 + sliderData / (2 * PROFILE_SLIDER_MIDDLE);
