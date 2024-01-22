module.exports = (sequelize, Sequelize) => {
    const order_list = sequelize.define("order_list", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: {      
        type: Sequelize.INTEGER
      },
      master_service_id: {      
        type: Sequelize.INTEGER
      },
      price: {      
        type: Sequelize.INTEGER
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'master_service_id', 'order_id']
        },
      ]
    });
  
    return order_list;
  };
  