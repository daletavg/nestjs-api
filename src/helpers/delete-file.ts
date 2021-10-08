import { unlinkSync, existsSync } from 'fs';

export const deleteFile = (path) => {
  try {
    unlinkSync(path);
  } catch (err) {
    console.log(err);
  }
};

export const checkExist = (path) => {
  try {
    return existsSync(path);
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { deleteFile, checkExist };
