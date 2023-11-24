/*:
 * @target MZ
 * @author Esteban Morales
 * @plugindesc Will use native storage instead of current storage. Use as is.
 *
 * @help
 * Implement filesystem for mobile platforms using CapacitorJS as the bridge.
 * When the game runs in the browser or NW.js it will use the default
 * implementation, but when running in an iPhone or Android phone it will
 * use the local storage of the phone.
 *
 * License: MIT
 *
 * Requirements
 * Node.JS
 * CapacitorJS
 * Vite 
 * CheerioJS
 * 
 * Instructions: Plug and play
 */

////////////////////////////////

StorageManager.isMobilePlatform = function () {
  return window.isMobilePlatform?.();
};

StorageManager.saveToNativeFile = async function (saveName, zip) {
  try {
    return await window.writeFile({ saveName, zip });
  } catch (error) {}
};

StorageManager.loadFromNativeFile = async function (saveName) {
  try {
    const fileRead = await window.readFile(saveName);
    return fileRead;
  } catch (error) {}
};

StorageManager.nativeFileExists = async function (saveName) {
  try {
    const exists = await window.fileExists(saveName);
    return exists;
  } catch (error) {}
};

StorageManager.removeNativeFile = function (saveName) {
  try {
    return window.deleteFile(saveName);
  } catch (error) {}
};

StorageManager.saveZip = function (saveName, zip) {
  if (this.isLocalMode()) {
    return this.saveToLocalFile(saveName, zip);
  } else if (this.isMobilePlatform()) {
    return this.saveToNativeFile(saveName, zip);
  } else {
    return this.saveToForage(saveName, zip);
  }
};

StorageManager.loadZip = function (saveName) {
  if (this.isLocalMode()) {
    return this.loadFromLocalFile(saveName);
  } else if (this.isMobilePlatform()) {
    return this.loadFromNativeFile(saveName);
  } else {
    return this.loadFromForage(saveName);
  }
};

StorageManager.exists = async function (saveName) {
  if (this.isLocalMode()) {
    return this.localFileExists(saveName);
  } else if (this.isMobilePlatform()) {
    return await this.nativeFileExists(saveName);
  } else {
    return this.forageExists(saveName);
  }
};

StorageManager.remove = function (saveName) {
  if (this.isLocalMode()) {
    return this.removeLocalFile(saveName);
  } else if (this.isMobilePlatform()) {
    return this.removeNativeFile(saveName);
  } else {
    return this.removeForage(saveName);
  }
};
