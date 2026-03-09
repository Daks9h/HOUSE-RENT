const multer = require('multer');
const path = require('path');

// Multer storage configuration
// Yeh decide karega ki files kahan aur kis naam se save hongi
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 'uploads/' folder mein file store hogi
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // File ka original extension nikaal kar current time ke saath naam denge
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type (sirf images allowed)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
