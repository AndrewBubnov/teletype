import { StyledLink } from '@/app/chat/[chatId]/styled';

export const LinkMessagePart = ({ href }: { href: string }) => (
	<>
		<br />
		<StyledLink href={href} target="_blank" rel="noopener noreferrer">
			{href}
		</StyledLink>
		<br />
	</>
);
