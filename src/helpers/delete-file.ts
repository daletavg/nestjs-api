import { unlinkSync } from 'fs';

export const deleteFile = (path) => {
  try {
    unlinkSync(path);
  } catch (err) {
    console.log(err);
  }
};
