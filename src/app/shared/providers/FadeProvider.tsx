import { createContext } from 'react';
import { FadeContextProps, FadeProviderProps } from '@/types';

export const FadeContext = createContext<FadeContextProps>({} as FadeContextProps);

export const FadeProvider = ({ children, onTransitionEnd }: FadeProviderProps) => (
	<FadeContext.Provider value={{ onTransitionEnd }}>{children}</FadeContext.Provider>
);
