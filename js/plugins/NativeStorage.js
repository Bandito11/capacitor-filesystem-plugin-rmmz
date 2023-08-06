/*:
 *
 * @type MZ
 * @author Esteban Morales
 * @plugindesc Will use native storage instead of current storage. Use as is.
 */

////////////////////////////////

StorageManager.isNativePlatform = function () {
  return window.isNativePlatform?.();
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

const _SMIsZip = StorageManager.saveZip;
StorageManager.saveZip = function (saveName, zip) {
  _SMIsZip.apply(this, arguments);
  if (this.isLocalMode()) {
    return this.saveToLocalFile(saveName, zip);
  }
  if (this.isNativePlatform()) {
    return this.saveToNativeFile(saveName, zip);
  } else {
    return this.saveToForage(saveName, zip);
  }
};
const _SMLoadZip = StorageManager.loadZip;
StorageManager.loadZip = function (saveName) {
  _SMLoadZip.apply(this, arguments);
  if (this.isLocalMode()) {
    return this.loadFromLocalFile(saveName);
  }
  if (this.isNativePlatform()) {
    return this.loadFromNativeFile(saveName);
  } else {
    return this.loadFromForage(saveName);
  }
};

const _SMExists = StorageManager.exists;
StorageManager.exists = async function (saveName) {
  _SMExists.apply(this, arguments);
  if (this.isLocalMode()) {
    return this.localFileExists(saveName);
  }
  if (this.isNativePlatform()) {
    return await this.nativeFileExists(saveName);
  } else {
    return this.forageExists(saveName);
  }
};

const _SMRemove = StorageManager.remove;
StorageManager.remove = function (saveName) {
  _SMRemove.apply(this, arguments);
  if (this.isLocalMode()) {
    return this.removeLocalFile(saveName);
  }
  if (this.isNativePlatform()) {
    return this.removeNativeFile(saveName);
  } else {
    return this.removeForage(saveName);
  }
};
