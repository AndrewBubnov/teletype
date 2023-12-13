import socketClient from 'socket.io-client';
import { WS_SERVER } from '@/constants';

export const ws = socketClient(WS_SERVER);
