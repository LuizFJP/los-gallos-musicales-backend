import { Options, memoryStorage } from "multer";
import { resolve } from "path";

export const multerConfig: Options = {
  dest: resolve(__dirname, '..', '..','uploads'),
  storage: memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req: any, file: any, callback: any) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
}