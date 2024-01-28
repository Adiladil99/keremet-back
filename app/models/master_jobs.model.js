module.exports = (sequelize, Sequelize, master) => {
    const master_jobs = sequelize.define("master_jobs", {
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
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'master_id']
        },
      ]
    });
  
    return master_jobs;
  };
  