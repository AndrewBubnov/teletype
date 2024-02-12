import { createElement, FC, useMemo } from 'react';
import { StyledElementProps } from '@/types';

export const StyledElement: FC<StyledElementProps> = ({
	element,
	className,
	styles,
	attributes = {},
	children,
	...props
}: StyledElementProps) => {
	const attributeStyles = useMemo(
		() =>
			Object.keys(attributes).reduce((acc, cur) => {
				const conditional = attributes[cur] ? styles[`${className}_${cur}`] : styles[`${className}_not_${cur}`];
				return `${acc} ${conditional}`;
			}, ''),
		[attributes, className, styles]
	);
	const classNameString = `${styles[className]} ${attributeStyles}`;

	return createElement<{ className: string }>(element, { className: classNameString, ...props }, children);
};
