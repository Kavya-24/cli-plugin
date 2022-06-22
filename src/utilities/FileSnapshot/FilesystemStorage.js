const fs = require('fs')

class FilesystemStorage {
  constructor(initialData = {}) {
    this.data = initialData;
  }

  async load(aliasFilePath) {
    try {
      const file = await fs.promises.readFile(aliasFilePath);
      return JSON.parse(file.toString('utf-8'));
    } catch {
      return await Promise.resolve(this.data);
    }
  }

  save(data, aliasFilePath) {
    return fs.promises.writeFile(aliasFilePath, JSON.stringify(data))
  }

  path(config) {
    const dataDirectory = config.dataDir;
    const aliasFolderName = 'alias';
    const aliasFolderPath = dataDirectory + '/' + aliasFolderName;
    const aliasFileName = 'data.json';
    const aliasFilePath = aliasFolderPath + '/' + aliasFileName;
    return aliasFilePath;
  }

  pathExists(path) {
    return fs.existsSync(path);
  }

  importPathExists(path) {
    return fs.existsSync(path);
  }

  makeDirectory(folderPath) {
    fs.mkdirSync(folderPath, { recursive: true })
    return;
  }

  copyFile(sourcePath, destPath, mode) {
    fs.copyFileSync(sourcePath, destPath);
  }

  removeDirectory(dir) {
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

module.exports = FilesystemStorage
