import {
  Filesystem,
  Directory,
  Encoding,
} from '../libs/@capacitor/filesystem.js';

let retries = 3;
const directory = Directory.Documents;

const createDir = async () => {
  await Filesystem.mkdir({
    path: 'save',
    directory,
    recursive: true,
  });
};

const readFile = async (saveName) => {
  const contents = await Filesystem.readFile({
    path: `save/${saveName}`,
    directory,
    encoding: Encoding.UTF8,
  });

  return contents.data;
};

window.writeFile = async ({ saveName, zip }) => {
  await Filesystem.writeFile({
    path: `save/${saveName}`,
    data: zip,
    directory,
    encoding: Encoding.UTF8,
  });
};

window.readFile = async (saveName) => {
  try {
    const contents = await readFile(saveName);
    return contents;
  } catch (error) {
    retries -= 1;
    if (retries > 0) {
      await createDir();
    }
    console.error(error);
  }
};

window.deleteFile = async (saveName) => {
  await Filesystem.deleteFile({
    path: `save/${saveName}`,
    directory,
  });
};

window.fileExists = async (saveName) => {
  const stats = await Filesystem.stat({
    path: `save/${saveName}`,
    directory,
  });
  return stats;
};
