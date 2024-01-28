module.exports = (sequelize, Sequelize, master, client, service) => {
    const master_comments = sequelize.define("master_comments", {
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
      client_id: {      
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: client,
          key: 'id',
        }
      },
      is_like: {
        type: Sequelize.BOOLEAN,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      comment: {
        type: Sequelize.STRING,
      },
      service_id: { 
        type: Sequelize.INTEGER,
        references: {
          model: service,
          key: 'id',
        }
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'master_id']
        },
      ]
    });
  
    return master_comments;
  };
  