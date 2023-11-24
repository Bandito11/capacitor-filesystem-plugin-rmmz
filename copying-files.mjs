import { cp, rm } from 'node:fs/promises';

cp('./game/audio', './www/audio', { recursive: true, force: true });
cp('./game/data', './www/data', { recursive: true, force: true });
cp('./game/fonts', './www/fonts', { recursive: true, force: true });
cp('./game/icon', './www/icon ', { recursive: true, force: true });
cp('./game/img', './www/img', { recursive: true, force: true });
cp('./game/js', './www/js', { recursive: true, force: true });
rm('www/js/native', {recursive: true});
