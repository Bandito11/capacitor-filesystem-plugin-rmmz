/*:
 * @target MZ
 * @author Esteban Morales
 * @plugindesc Will use native storage instead of current storage. Use as is.
 *
 * @help
 * This will only work if you are using CapacitorJS and installed the Capacitor Filesystem plugin.
 *
 * License: MIT
 *
 * Requirements
 * Node.JS
 * CapacitorJS
 * vite 
 *
 * 1. In the **index.html** add this line just before the **script** with **main.js** as the value for **src** :
 *
 * ```html
 * <!--...--->
 * <script type="module" src="js/native/file.js"></script>
 * <!--DON'T TOUCH ANYTHING BELOW THIS LINE-->
 * <script type="text/javascript" src="js/main.js"></script>
 * <!--...--->
 * ```
 * 2. Now do the same for the value of **src** `js/native/utils.js` instead of `file.js`.
 * 3. Add this plugin in the RMMZ software in the plugin manager by copying everything on the `js` folder into your game `js` folder.
 * 4. Deploy the game, as `Web Browser/ Android/ iOS` to a new folder, outside of this one.
 * 5. Go to [title](https://capacitorjs.com/) and follow the instructions on the official docs on how to add **Capacitor** to a web app. Start at **Introduction** and follow the documentation. **Ionic framework is NOT REQUIRED.**
 * 6. In the terminal, you should install the official plugin for the filesystem `@capacitor/filesytem`. Follow the instructions the official CapacitorJS documentation [title](https://capacitorjs.com/docs/apis/filesystem).
 * 7. Write `npx vite build game --outDir=../www --emptyOutDir --base=\" \"` ~~in order to copy the necessary modules to the game folder. <em>Note: You can change the path and even the name of the folder, web_modules, but then you also have to change the path of the file.js and core.js inside the native folder.</em>~~, this will build the game with the packages needed for the native implementation. The Capacitor packages are node_modules and Vite will add all the packages automatically to your project.
 * 8. ~~On index.html, add the path to core.js and filesystem.js that are inside `js/web_modules/@capacitor`.~~ In the terminal write `node file.mjs`, this script will copy every directory inside your game to the **www** directory.
 * 9. Test your game and everything should be working correctly.

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
