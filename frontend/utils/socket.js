import { io } from 'socket.io-client';

const socket = io('https://boardflow-xlhx.onrender.com');

export default socket;