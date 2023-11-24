import { Capacitor } from '@capacitor/core';

window.getPlatform = () => {
  const isElectron = navigator.userAgent.toLowerCase().match('electron');
  if (isElectron) {
    return isElectron;
  } else {
    return Capacitor.getPlatform();
  }
};

window.isMobilePlatform = () => {
  return Capacitor.isNativePlatform();
};
