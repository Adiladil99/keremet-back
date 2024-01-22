module.exports = (sequelize, Sequelize) => {
    const static_info = sequelize.define("static_info", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.ENUM('privacy', 'terms', 'payment', 'sitemap', 'contacts'),
        defaultValue: 'privacy'
      },
      name: {      
        type: Sequelize.STRING
      },  
      description: {      
        type: Sequelize.STRING
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'type']
        },
      ]
    });
  
    return static_info;
  };
  