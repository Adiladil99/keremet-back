module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      client_id: {      
        type: Sequelize.INTEGER
      },
      master_id: {      
        type: Sequelize.INTEGER
      },
      total: {      
        type: Sequelize.STRING
      },
      time_total: {
        type: Sequelize.INTEGER
      },
      date: {      
        type: Sequelize.DATE
      },
      status: { 
        type: Sequelize.ENUM('success', 'error', 'returned'),
        defaultValue: 'success'
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'client_id', 'master_id']
        },
      ]
    });
  
    return order;
  };
  