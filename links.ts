import { readdir, stat, symlink } from 'fs/promises';
import { join } from 'path';

// n -sr "./src/features/test1/app" "./src/app/(features)/(test1)"
// symlink(__dirname + '/src/features/test1/app', __dirname + '/src/app/(features)/(test1)').then(o => console.log(o))
// symlink('./src/features/test1/app', __dirname + './src/app/(features)/(test1)').then(o => console.log(o))

const __appFeatures = __dirname + '/src/app/(features)';
readdir(__appFeatures, {
  withFileTypes: true
}).then(async o => {
  console.log(o);
  for (const item of o) {
    console.log(item.name, item.isDirectory(), item.isSymbolicLink())
    if (!item.isDirectory()) {
      const stats = await stat(join(__appFeatures, item.name));
      console.log(stats.isDirectory(), stats);
    }
  }
})

