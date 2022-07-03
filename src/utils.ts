import Cloudinary from './cloudinary';
const fun = async () => {
  const response = await Cloudinary.uploader.upload('',
    {
      upload_preset: 'Chatverse',
    }
  );

  return response;
};
export default fun;
