module.exports = (sequelize, Sequelize) => {
    const master = sequelize.define("master", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },    
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      image: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      gender: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.ENUM('Мастер', 'Барбер', 'Врач', 'Массажист', 'Косметолог', 'Парикмахер', 'Стилист'),
        defaultValue: 'Мастер'
      },
      password: {
        type: Sequelize.STRING
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['id']
        },
      ]
    });
  
    return master;
  };
  