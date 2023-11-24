# Capacitor filesystem plugin for RPG Maker MZ

Filesystem storage for RPG Maker MZ games. (I am unsure if this works for RPG Maker MV too)

**My name is not required to add on the credits of your game but appreciated.**

Requirements:

- [Node.JS](https://nodejs.org)
- [Capacitor](https://capacitorjs.com/docs/getting-started)
- [RPG Maker MZ](https://rpgmakerweb.com)
- ~~Pika web: `npm install @pika/web` after installing Node.JS and install it on the folder where you deployed the game.~~ **Update! The package for @pika/web was discontinued and they recommended to use Vite**
- Vite: [Vite](https://vitejs.dev/guide/)
- Cheerio: [Cheerio](https://cheerio.js.org/docs/api)

## These instructions will be done in the folder where you deployed game

1. Deploy your game, as `Web Browser/ Android/ iOS` to a new directory.
2. Go to [Capacitor docs](https://capacitorjs.com/docs/) and follow the instructions on the official docs on how to add **Capacitor** to a web app. **Ionic framework is NOT REQUIRED.**
3. In the terminal, you should install the official plugin for the [@capacitor/filesystem](https://capacitorjs.com/docs/apis/filesystem).
4. Write `node adding-scripts.mjs` in the terminal. This will add the `file.js` and `utils.js` to the deployed game `index.html` file.
5. Add Vite to your `package.json` and after doing so write `npx vite build game --outDir=../www --emptyOutDir --base=\" \"` ~~in order to copy the necessary modules to the game folder. <em>Note: You can change the path and even the name of the folder, web_modules, but then you also have to change the path of the file.js and core.js inside the native folder.</em>~~; this will build the game with the node_modules packages needed for the native implementation.
6. ~~On index.html, add the path to core.js and filesystem.js that are inside `js/web_modules/@capacitor`.~~ In the terminal write `node copying-files.mjs`; this script will copy every directory inside your game to the **www** directory since `vite build` doesn't copy directories that were not added to the `index.html`.
7. Now just follow the official Capacitor docs to build your game to the mobile platform of your choice.

_Note: The reason why you didn't add the `script` tags in the `index.html` file of the main game is because the `js/native/file.js` and `js/native/utils.js` are modules importing `@capacitor/core` and `@capacitor/filesystem` in a way that is not compatible in the browser. In order to mitigate this, the `cheerio` package was used to add the scripts to the `index.html` file on the deployed game. If you see a better way to do this, fork it and make a pull request._
