import { Capacitor } from '../libs/@capacitor/core.js';

window.getPlatform = () => {
  const isElectron = navigator.userAgent.toLowerCase().match('electron');
  if (isElectron) {
    return isElectron;
  } else {
    return Capacitor.getPlatform();
  }
};

window.isNativePlatform = () => {
  return Capacitor.isNativePlatform();
};
