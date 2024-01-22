const slug = require('slug')

module.exports = (sequelize, Sequelize, category) => {
    const sub_category = sequelize.define("sub_category", {
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
      image: {      
        type: Sequelize.STRING
      },
      category_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: category,
          key: 'id',
        }
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'slug', 'category_id']
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
  
    return sub_category;
  };
  