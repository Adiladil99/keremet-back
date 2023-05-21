const path = require('path');
const fs = require('fs');

const after = async (response, request, context) => {
  const { record, uploadImage } = context;

  if (record.isValid() && uploadImage) {
    const filePath ='upload/'+`${Date.now()}-${uploadImage.name}`;
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadImage.path, filePath);

    await record.update({ image: `/${filePath}` });
  }
  return response;
};

const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadImage, ...otherParams } = request.payload;

    console.log('request', uploadImage)
    // eslint-disable-next-line no-param-reassign
    context.uploadImage = uploadImage;
    console.log('uploadImage', uploadImage);
    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };