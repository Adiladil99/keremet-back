module.exports = (sequelize, Sequelize, master) => {
    const master_gallery = sequelize.define("master_gallery", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },   
      master_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: master,
          key: 'id',
        }
      },
      image: {
        type: Sequelize.STRING,
      },
      is_main: {
        type: Sequelize.BOOLEAN,
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'master_id']
        },
      ]
    });
  
    return master_gallery;
  };
  