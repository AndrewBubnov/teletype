import { useContext } from 'react';
import { FadeContext } from '@/app/shared/providers/FadeProvider';

export const useFadeContext = () => useContext(FadeContext);
