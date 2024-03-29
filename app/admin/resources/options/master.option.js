
const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('../actions/upload-image.hook');

// const categoryHandler = async (request, response, context) => {
//   // console.log(context._admin);
//   const { record, currentAdmin } = context
//           return {
//             record: record.toJSON('sadasdsad'),
//             msg: 'asdasd'
//           }
// }

const options = {
  resource: db.master,
  options: {
    navigation: sidebar[2],
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
        isVisible: false,
      },
      edit: {
        isVisible: false,
      },
    },
  },  
};

module.exports = options