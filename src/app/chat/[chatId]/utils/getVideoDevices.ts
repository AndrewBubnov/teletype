export const getVideoDevices = (devices: MediaDeviceInfo[]) =>
	devices.filter(device => device.kind === 'videoinput').map(el => el.deviceId);
