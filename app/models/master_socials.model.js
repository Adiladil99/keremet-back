module.exports = (sequelize, Sequelize, master) => {
    const master_socials = sequelize.define("master_socials", {
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
      type: {
        type: Sequelize.ENUM('whatsapp', 'telegram', 'viber', 'phone', 'email', 'instagram', 'tiktok'),
        defaultValue: 'phone'
      },
      link: {
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
  
    return master_socials;
  };
  