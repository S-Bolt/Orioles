const multer = require('multer');
const path = require('path');

//Configure Multer to store files in "uploads" directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *  1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    },
  });
  
  //File filter for images only
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
    if(extname){
      cb(null, true)
    } else {
      cb(new Error('Only JPEG, JPG, and PNG images allowed.'), false)
    }
  };
  
  const upload = multer({ storage, fileFilter});
  
module.exports = upload;
