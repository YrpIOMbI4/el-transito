const path = require('path');
const fse = require('fs-extra');

const packagePath = path.normalize(process.cwd());

function applyPublishConfigPaths(): void {
  const packageData = fse.readFileSync(path.resolve(packagePath, './package.json'), 'utf8');
  const { scripts, publishConfig, ...packageDataOther } = JSON.parse(packageData);

  const newPackageData = {
    ...packageDataOther,
    main: publishConfig.main,
    types: publishConfig.types,
    publishConfig,
  };

  const targetPath = path.resolve(packagePath, './package.json');

  fse.writeFileSync(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON file has been updated.');
  });
}

applyPublishConfigPaths();
