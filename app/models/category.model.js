const slug = require('slug')

module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("category", {
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
  
    return category;
  };
  