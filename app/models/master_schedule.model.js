module.exports = (sequelize, Sequelize, master) => {
    const master_schedule = sequelize.define("master_schedule", {
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
      start_at: {      
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_at: {      
        type: Sequelize.TIME,
        allowNull: false,
      },
      day_week: {
        type: Sequelize.ENUM('mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'),
        allowNull: false,
      },
      day_off: {      
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id', 'day_week']
        },
      ]
    });
  
    return master_schedule;
  };
  