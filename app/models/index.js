const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: '0',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.model.js")(sequelize, Sequelize);
db.sub_category = require("./sub_category.model.js")(sequelize, Sequelize, db.category);
db.master = require("./master.model.js")(sequelize, Sequelize);
db.service = require("./service.model.js")(sequelize, Sequelize, db.sub_category);
db.client_basket = require("./client_basket.model.js")(sequelize, Sequelize);
db.client_favourites = require("./client_favourites.model.js")(sequelize, Sequelize);
db.client_history = require("./client_history.model.js")(sequelize, Sequelize);
db.client = require("./client.model.js")(sequelize, Sequelize);
db.discount = require("./discount.model.js")(sequelize, Sequelize, db.master);
db.faq = require("./faq.model.js")(sequelize, Sequelize);
db.master_comments = require("./master_comments.model.js")(sequelize, Sequelize, db.master, db.client);
db.master_gallery = require("./master_gallery.model.js")(sequelize, Sequelize, db.master);
db.master_services = require("./master_services.model.js")(sequelize, Sequelize, db.service, db.master);
db.master_socials = require("./master_socials.model.js")(sequelize, Sequelize, db.master);
db.order_list = require("./order_list.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.static_info = require("./static_info.model.js")(sequelize, Sequelize);

db.category.hasMany(db.sub_category, { as: 'childs', foreignKey: 'category_id' });
db.master.hasMany(db.master_gallery, { as: 'gallery', foreignKey: 'master_id' });
db.master.hasMany(db.master_services, { as: 'services', foreignKey: 'master_id' });
db.master.hasMany(db.master_comments, { as: 'comments', foreignKey: 'master_id' });
db.master.hasMany(db.master_socials, { as: 'socials', foreignKey: 'master_id' });

db.sub_category.hasMany(db.service, { as: 'services', foreignKey: 'subcategory_id' });
db.service.hasMany(db.master_services, { as: 'masters', foreignKey: 'service_id' });

db.master_services.belongsTo(db.master, { foreignKey: 'master_id', as: 'master' })
db.master_services.belongsTo(db.service, { foreignKey: 'service_id', as: 'service' })



// db.clients = require("./client.model.js")(sequelize, Sequelize);
// db.drivers = require("./drivers.model.js")(sequelize, Sequelize);
// db.orders = require("./orders.model.js")(sequelize, Sequelize);
// db.moving = require("./moving.model.js")(sequelize, Sequelize);
// db.order_status = require("./order_status.model.js")(sequelize, Sequelize);
// db.order_history = require("./order_history.model.js")(sequelize, Sequelize);

// db.orders.belongsTo(db.cities, { foreignKey: 'sender_city', as: 'senderCity' });
// db.orders.belongsTo(db.cities, { foreignKey: 'recipient_city', as: 'recipientCity' });
// db.moving.belongsTo(db.clients, { foreignKey: 'client_id', as: 'clientId' });
// db.order_status.belongsTo(db.orders, { foreignKey: 'order_id', as: 'orderId' });
// db.order_status.belongsTo(db.clients, { foreignKey: 'client_id', as: 'clientId' });
// db.order_status.belongsTo(db.drivers, { foreignKey: 'driver_id', as: 'driverId' });
// db.order_history.belongsTo(db.order_status, { foreignKey: 'order_status_id', as: 'orderStatusId' });

// db.tarrif = require("./products/tarrif.model.js")(sequelize, Sequelize, db.car);

// db.cities = require("./others/cities.model.js")(sequelize, Sequelize);
// db.country = require("./others/country.model.js")(sequelize, Sequelize);
// db.callform = require("./others/callform.model.js")(sequelize, Sequelize);
// db.commentform = require("./others/commentform.model.js")(sequelize, Sequelize);

// db.client = require("./clients/client.model.js")(sequelize, Sequelize);

// db.order = require("./orders/order.model.js")(sequelize, Sequelize, db.tarrif, db.client);

// //product models
// db.pr_attribute = require("./products/attribute.model.js")(sequelize, Sequelize);
// db.pr_brand = require("./products/manufacturers.model.js")(sequelize, Sequelize);
// db.pr_category = require("./products/category.model.js")(sequelize, Sequelize, db.translates);
// db.pr_discount = require("./products/discount.model.js")(sequelize, Sequelize, db.translates);
// db.pr_reviews = require("./products/pr_reviews.model.js")(sequelize, Sequelize);
// db.pr_images = require("./products/pr_images.model.js")(sequelize, Sequelize);
// db.features = require("./products/features.model.js")(sequelize, Sequelize);
// db.category_brands = require("./products/category_brands.model.js")(sequelize, Sequelize);
// db.category_characteristics = require("./products/category_characteristics.model.js")(sequelize, Sequelize);
// db.product_discounts = require("./products/product_discounts.model.js")(sequelize, Sequelize, db.pr_product, db.pr_discount);
// db.brand_discounts = require("./products/manufacturers_discounts.model.js")(sequelize, Sequelize, db.pr_brand, db.pr_discount);
// db.category_discounts = require("./products/category_discounts.model.js")(sequelize, Sequelize, db.pr_category, db.pr_discount);
// db.pr_attribute_values = require("./products/attribute_values.model.js")(sequelize, Sequelize);

// //products associations
// db.pr_product.hasMany(db.pr_images);
// db.pr_category.hasOne(db.pr_category, {as: 'sub_categories', foreignKey: 'parentId'});
// db.pr_product.hasMany(db.pr_reviews);
// db.pr_brand.hasMany(db.pr_product);
// db.pr_category.hasMany(db.pr_product);


// db.category_brands.belongsTo(db.pr_category);
// db.category_brands.belongsTo(db.pr_brand);

// db.category_characteristics.belongsTo(db.pr_category);
// db.pr_attribute.hasMany(db.category_characteristics);
// db.category_characteristics.belongsTo(db.pr_attribute);
// db.pr_attribute.hasMany(db.pr_attribute_values);

// db.features.belongsTo(db.pr_attribute);
// db.features.belongsTo(db.pr_attribute_values);
// db.features.belongsTo(db.pr_product);
// db.pr_product.hasMany(db.features);

// //shop models
// db.sh_addresses = require("./pharmacy/addresses.model.js")(sequelize, Sequelize);
// db.sh_delivery = require("./pharmacy/delivery.model.js")(sequelize, Sequelize);
// db.sh_inventory = require("./pharmacy/inventory.model.js")(sequelize, Sequelize);
// db.sh_schedule = require("./pharmacy/schedule.model.js")(sequelize, Sequelize);
// db.sh_reviews = require("./pharmacy/sh_reviews.model.js")(sequelize, Sequelize);
// db.sh_shop = require("./pharmacy/shop.model.js")(sequelize, Sequelize);
// db.sh_users_role = require("./pharmacy/users_role.model.js")(sequelize, Sequelize);
// db.sh_users = require("./pharmacy/users.model.js")(sequelize, Sequelize);
// db.adv = require("./pharmacy/adv.model.js")(sequelize, Sequelize);
// db.banners = require("./content/banners.model.js")(sequelize, Sequelize);
// db.adv_pharmacy = require("./pharmacy/adv_pharmacy.model.js")(sequelize, Sequelize);

// //shop associations
// db.sh_addresses.belongsTo(db.sh_shop);
// db.sh_addresses.belongsTo(db.cities);
// db.sh_shop.hasMany(db.sh_reviews);
// db.sh_addresses.hasOne(db.sh_schedule);
// db.cities.hasMany(db.sh_addresses);
// db.sh_inventory.belongsTo(db.sh_addresses);
// db.pr_product.hasMany(db.sh_inventory);
// db.sh_inventory.belongsTo(db.pr_product);
// db.sh_shop.hasMany(db.sh_users);
// db.sh_users_role.hasOne(db.sh_users);
// db.sh_shop.hasOne(db.sh_delivery);
// db.cities.hasMany(db.sh_delivery);
// db.adv_pharmacy.belongsTo(db.sh_shop);
// db.adv_pharmacy.belongsTo(db.adv);


// //client models
// db.cl_addresses = require("./clients/addresses.model.js")(sequelize, Sequelize);
// db.cl_client = require("./clients/client.model.js")(sequelize, Sequelize);
// db.cl_cart = require("./clients/cart.model.js")(sequelize, Sequelize, db.pr_product, db.cl_client);
// db.favorites_pharmacy = require("./clients/favorites_pharmacy.model.js")(sequelize, Sequelize);
// db.cl_favorites = require("./clients/favorites.model.js")(sequelize, Sequelize, db.pr_product, db.cl_client);

// db.pr_brand.belongsTo(db.country);
// db.favorites_pharmacy.belongsTo(db.sh_shop);
// db.favorites_pharmacy.belongsTo(db.cl_client);
// //client associations
// db.pr_reviews.belongsTo(db.cl_client); 
// db.cl_client.hasMany(db.sh_reviews);
// db.cl_client.hasMany(db.cl_addresses);
// db.cities.hasMany(db.cl_addresses);

// //order models
// db.or_order_list = require("./orders/order_list.model.js")(sequelize, Sequelize);
// db.or_order = require("./orders/order.model.js")(sequelize, Sequelize);
// // db.or_payment_type = require("./orders/payment_type.model.js")(sequelize, Sequelize, db.translates);
// // db.or_status = require("./orders/status.model.js")(sequelize, Sequelize);

// //order associations
// // db.or_payment_type.hasMany(db.or_order);
// // db.or_status.hasMany(db.or_order);
// db.sh_shop.hasMany(db.or_order);
// db.cl_client.hasMany(db.or_order);
// db.or_order.hasMany(db.or_order_list);
// db.pr_product.hasMany(db.or_order_list);


// db.pr_category.belongsTo(db.translates, {foreignKey: 'name'});
// db.cities.belongsTo(db.translates, {foreignKey: 'name'});
// db.pr_product.belongsTo(db.translates, { as: 'nameField', foreignKey: 'name' });
// db.pr_product.belongsTo(db.translates, { as: 'descriptionField', foreignKey: 'description' });
// db.pr_brand.belongsTo(db.translates, { as: 'nameField', foreignKey: 'name' });
// db.pr_brand.belongsTo(db.translates, { as: 'descriptionField', foreignKey: 'description' });
// db.country.belongsTo(db.translates, { as: 'nameCounrty', foreignKey: 'name' });
// db.pr_attribute.belongsTo(db.translates, { foreignKey: 'name' });
// db.sh_shop.belongsTo(db.translates, { foreignKey: 'name' });
// db.adv.belongsTo(db.translates, { as: 'nameField', foreignKey: 'name' });
// db.adv.belongsTo(db.translates, { as: 'descriptionField', foreignKey: 'description' });
// db.banners.belongsTo(db.translates, { as: 'nameField', foreignKey: 'name' });
// db.banners.belongsTo(db.translates, { as: 'descriptionField', foreignKey: 'description' });

// //admin models
// db.ad_user = require("./admin/user.model.js")(sequelize, Sequelize);
// db.ad_role = require("./admin/role.model.js")(sequelize, Sequelize);
// db.ad_user_roles = require("./admin/user_roles.model.js")(sequelize, Sequelize, db.ad_user, db.ad_role);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
