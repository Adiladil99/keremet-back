module.exports = (sequelize, Sequelize, service, master) => {
    const master_services = sequelize.define("master_services", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      service_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: service,
          key: 'id',
        }
      },
      master_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: master,
          key: 'id',
        }
      },
      is_home: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.ENUM('30', '60', '90', '120', '150', '180'),
        defaultValue: '30'
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'service_id', 'master_id']
        },
      ]
    });
  
    return master_services;
  };
  