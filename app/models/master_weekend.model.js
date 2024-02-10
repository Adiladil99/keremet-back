module.exports = (sequelize, Sequelize, master) => {
    const master_weekend = sequelize.define("master_weekend", {
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
      date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'master_id']
        },
      ]
    });
  
    return master_weekend;
  };
  