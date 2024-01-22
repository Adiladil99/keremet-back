
const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('../actions/upload-image.hook');

const options = {
  resource: db.discount,
  options: {
    navigation: sidebar[0],
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },
      id: {
        isTitle: true
      },
      image: {
        isVisible: false,
      },
      slug: {
        isVisible: {
          edit: false,
          list: false,
          show: true,
        },
      },
      uploadImage: {
        components: {
          edit: Components.UploadImage,
          list: Components.ImageList,
          show: Components.ImageShow,
        },
      }
    },
    actions: {
      new: {
        after: async (response, request, context) => {
          // const modifiedResponse = await passwordAfterHook(response, request, context);
          return uploadAfterHook(response, request, context);
        },
        before: async (request, context) => {
          // const modifiedRequest = await passwordBeforeHook(request, context);
          return uploadBeforeHook(request, context);
        },
      },
      edit: {
        after: async (response, request, context) => {
          return uploadAfterHook(response, request, context);
        },
        before: async (request, context) => {
          return uploadBeforeHook(request, context);
        },
      },
    },
  },  
};

module.exports = options