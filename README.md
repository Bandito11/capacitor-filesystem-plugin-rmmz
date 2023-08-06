# native-storage-plugin
Native storage using Capacitor JS for RPG Maker MV/MZ games.

1. On index.html add this just before the script with main.js: `<script type="module" src="js/native/file.js"></script>`
2. Now do the same but for `js/native/utils.js`, `js/web_modules/@capacitor/core.js` and `js/web_modules/@capacitor/filesystem.js`.
3. Add this plugin in the RMMZ software in the plugin manager.
4. Deploy the game, as `Web Browser/ Android/ iOS` to a new folder, outside of this one.
5. Go to capacitorjs.com and follow the instructions on the official docs on how to add to add a native component to a web app. Start at `Introduction` and follow the documentation. Ionic framework is NOT REQUIRED."
6. On the `capacitor.config.json`, on `webDir`, change it the name of the folder (the deployed game should be in this folder).
7. In the terminal, you should install the official plugin for the filesystem `@capacitor/filesytem`. Follow the instructions the official CapacitorJS documentation.
8. Now install `npm i @pika/web` in the same folder with the deployed game and capacitorjs files.
9. Write `npx @pika/web --dest game_folder/js/web_modules` in order to copy the necessary modules to the game folder. <em>Note: You can change the path and even the name of the folder, web_modules, but then you also have to change the path of the file.js and core.js inside the native folder.</em>
10. On index.html, add the path to core.js and filesystem.js that are inside `js/web_modules/@capacitor`.