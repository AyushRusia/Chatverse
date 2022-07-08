import cloudinary from 'cloudinary';

const Cloudinary = cloudinary.v2;
Cloudinary.config({
  cloud_name: 'ayushself',
  api_key: '999946772891731',
  api_secret: 'pa7uQJIkzXSZy-N724tlVJH95dY',
  secure: true,
});

export default Cloudinary;
