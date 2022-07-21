const { Resolver } = require('@parcel/plugin');
const path = require('path');
const fs = require('fs');

module.exports = new Resolver({
  async resolve({ specifier, options: { projectRoot } }) {
    const options = [
      path.join(projectRoot, 'src', path.parse(specifier).name),
      path.join(projectRoot, 'src', `${path.parse(specifier).name}.js`),
      path.join(projectRoot, 'src', path.parse(specifier).name, 'index.js'),
    ];

    for (const filePath of options) {
      if (fs.existsSync(filePath)) {
        return { filePath };
      }
    }

    return null;
  },
});
