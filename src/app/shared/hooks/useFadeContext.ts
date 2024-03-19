import { useContext } from 'react';
import { FadeContext } from '@/app/shared/components/Fade';

export const useFadeContext = () => useContext(FadeContext);
