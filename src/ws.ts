import socketClient from 'socket.io-client';
import { WSS_URL } from '@/constants';

export const ws = socketClient(WSS_URL);
