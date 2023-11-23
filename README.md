# Capacitor filesystem plugin for RPG Maker MZ

Filesystem storage for RPG Maker MZ games. (I am unsure if this works for RPG Maker MV too)

**My name is not required to add on the credits of your game but appreciated.**

Requirements:

- [Node.JS](https://nodejs.org)
- [Capacitor](https://capacitorjs.com/docs/getting-started)
- [RPG Maker MZ](https://rpgmakerweb.com)
- ~~Pika web: `npm install @pika/web` after installing Node.JS and install it on the folder where you deployed the game.~~ **Update! The package for @pika/web was discontinued and they recommended to use Vite**
- Vite: Install this program on the folder where you deployed the game. `npm install vite`

## These instructions will be done in the folder where you deployed game

1. In the **index.html** add this line just before the **script** with **main.js** as the value for **src** :

```html
<!--...--->
<script type="module" src="js/native/file.js"></script>
<!--DON'T TOUCH ANYTHING BELOW THIS LINE-->
<script type="text/javascript" src="js/main.js"></script>
<!--...--->
```

2. Now do the same for the value of **src** `js/native/utils.js` instead of `file.js`.
3. Add this plugin in the RMMZ software in the plugin manager by copying everything on the `js` folder into your game `js` folder.
4. Deploy the game, as `Web Browser/ Android/ iOS` to a new folder, outside of this one.
5. Go to [title](https://capacitorjs.com/) and follow the instructions on the official docs on how to add **Capacitor** to a web app. Start at **Introduction** and follow the documentation. **Ionic framework is NOT REQUIRED.**
6. In the terminal, you should install the official plugin for the filesystem `@capacitor/filesytem`. Follow the instructions the official CapacitorJS documentation [title](https://capacitorjs.com/docs/apis/filesystem).
7. Write `npx vite build game --outDir=../www --emptyOutDir --base=\" \"` ~~in order to copy the necessary modules to the game folder. <em>Note: You can change the path and even the name of the folder, web_modules, but then you also have to change the path of the file.js and core.js inside the native folder.</em>~~, this will build the game with the packages needed for the native implementation. The Capacitor packages are node_modules and Vite will add all the packages automatically to your project.
8. ~~On index.html, add the path to core.js and filesystem.js that are inside `js/web_modules/@capacitor`.~~ In the terminal write `node file.mjs`, this script will copy every directory inside your game to the **www** directory.
9. Test your game and everything should be working correctly.
