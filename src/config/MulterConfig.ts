import { Options, diskStorage } from "multer";
import { resolve } from "path";

export const multerConfig: Options = {
  dest: resolve(__dirname, '..', '..','uploads', 'avatar_images'),
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..','uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
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