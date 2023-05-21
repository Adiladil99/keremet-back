const { ComponentLoader } = require('adminjs')

const componentLoader = new ComponentLoader()


exports.Components = {
 UploadImage: componentLoader.add('UploadImage', `./uploadImage.tsx`),
 ImageList: componentLoader.add('ImageList', `./imageList.tsx`),
 ImageShow: componentLoader.add('ImageShow', `./imageShow.tsx`),
 Dashboard: componentLoader.add('Dashboard', './dashboard'),
 MyInput: componentLoader.add('MyInput', './myInput'),
 CharacteristicsCategory: componentLoader.add('CharacteristicsCategory', './characteristicsCategory'),
 BrandsCategory: componentLoader.add('BrandsCategory', './brandsCategory'),
 CharacteristicsList: componentLoader.add('CharacteristicsList', './characteristicsList'),
 AddFeatures: componentLoader.add('addFeatures', './addFeatures'),
 TranslateText: componentLoader.add('TranslateText', './translateText'),
 LinkIdShow: componentLoader.add('LinkIdShow', './linkIdShow'),
 LinkIdList: componentLoader.add('LinkIdList', './linkIdList'),
 AddressPharmacy: componentLoader.add('AddressPharmacy', './addressPharmacy'),
 ButtonsLink: componentLoader.add('ButtonsLink', './buttonsLink'),
 IdPrevPage: componentLoader.add('IdPrevPage', './idPrevPage'),
}

exports.componentLoader = componentLoader