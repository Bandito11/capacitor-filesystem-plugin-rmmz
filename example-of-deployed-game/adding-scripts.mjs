import { readFile, writeFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';

const path = './game/index.html'
const html = await readFile(path);

const $ = cheerio.load(html);

$('body').append('<script type="module" src="js/native/utils.js"></script>');
$('body').append('<script type="module" src="js/native/file.js"></script>');

await writeFile(path, $('html').toString())