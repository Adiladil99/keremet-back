const slug = require('slug')

module.exports = (sequelize, Sequelize, master) => {
    const Discount = sequelize.define("discount", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },    
      name: {      
        type: Sequelize.STRING
      },
      slug: {      
        type: Sequelize.STRING
      },
      description: {      
        type: Sequelize.STRING
      },
      percent: {      
        type: Sequelize.INTEGER
      },
      start_at: {      
        type: Sequelize.DATE
      },
      end_at: {      
        type: Sequelize.DATE
      },
      image: {      
        type: Sequelize.STRING
      },
      master_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: master,
          key: 'id',
        }
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'slug']
        },
      ],
      hooks : {
        beforeCreate : (record, options) => {
            record.dataValues.slug = slug(record.dataValues.name);
        },
        beforeUpdate : (record, options) => {
          record.dataValues.slug = slug(record.dataValues.name);
        }
      }
    });
  
    return Discount;
  };
  