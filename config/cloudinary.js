const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pathly_uploads',
    resource_type: 'auto', // Isse PDF aur Images dono support honge
    allowed_formats: ['jpg', 'png', 'pdf']
  }
});

const upload = multer({ storage: storage });
module.exports = upload;