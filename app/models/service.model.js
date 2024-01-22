module.exports = (sequelize, Sequelize, subcategory) => {
    const service = sequelize.define("service", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },    
      name: {      
        type: Sequelize.STRING
      },
      description: {      
        type: Sequelize.STRING
      },
      image: {      
        type: Sequelize.STRING
      },
      subcategory_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: subcategory,
          key: 'id',
        }
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'subcategory_id']
        },
      ]
    });
  
    return service;
  };
  