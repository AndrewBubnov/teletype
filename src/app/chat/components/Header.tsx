import { Drawer } from '@/app/chat/components/Drawer';
import { UserImage } from '@/app/chat/components/UserImage';

export const Header = () => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '1.5rem 1rem 0 0.5rem',
		}}
	>
		<Drawer />
		<UserImage />
	</div>
);
