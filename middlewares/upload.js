const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/uploads');
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = function (req, file, cb) {
    // Accept only video files
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  };

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;