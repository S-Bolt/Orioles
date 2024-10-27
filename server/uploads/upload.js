const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

//Configure Multer to store files in "uploads" directory.  Directs storage to specific folder based on type
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       if(file.fieldname === 'profilePictures'){
//         cb(null, path.join(__dirname, '../uploads/profilePictures'));
//       } else if(file.fieldname === "image") {
//         cb(null, path.join(__dirname, '../uploads/blogImages'));
//       } else {
//         cb(null, path.join(__dirname, '../uploads'));
//       }
      
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *  1E9)
//       cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
//     },
//   });
  
//   //File filter for images only
//   const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
  
//     if(extname && mimetype){
//       cb(null, true)
//     } else {
//       cb(new Error('Only JPEG, JPG, GIF, and PNG images allowed.'), false)
//     }
//   };
  
//   const upload = multer({ 
//     storage, 
//     fileFilter,  
//     limits: { fileSize: 5 * 1024 * 1024 },
//   });
  
module.exports = upload;
