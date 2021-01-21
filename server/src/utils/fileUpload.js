import multer from 'multer';
import fs from 'fs';

const uploadPath = `public/uploads/${new Date().getFullYear()}`;
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidFileType = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');
    if (isValidFileType) uploadError = null;
    cb(uploadError, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(' ', '-').split('.')[0];
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

export default multer({ storage });
