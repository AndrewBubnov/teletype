import { PROFILE_SLIDER_MIDDLE } from '@/app/profile/constants';

export const getRotationFromSliderValue = (sliderData: number) => (sliderData - PROFILE_SLIDER_MIDDLE) * (9 / 5);
