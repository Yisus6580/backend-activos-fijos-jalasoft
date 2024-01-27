import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./images${req.baseUrl}`);
  },
  filename: function (req, file, cb) {
    const extname = '.' + file.mimetype.split('/')[1];
    cb(null, Date.now() + '_' + file.fieldname + extname);
  },
});

const upload = multer({ storage: storage });

export default upload;
