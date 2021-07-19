const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: 'video',
        folder: 'SOTS-Reports',
        chunk_size: 6000000, 
        format: 'MOV'
        // allowedFormats: ['mp4', 'MOV'],
    }
});

module.exports = { cloudinary, storage }