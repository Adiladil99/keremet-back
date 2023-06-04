module.exports = (sequelize, Sequelize) => {
  const Moving = sequelize.define("moving", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: { 
      type: Sequelize.ENUM("Нет" ,'Фура', 'Грузовик', 'Минивэн'),
      defaultValue: 'Нет'
    },
    type_payment: { 
      type: Sequelize.ENUM('После работы', 'С банковской картой'),
      defaultValue: 'После работы'
    },
    car_bool: {
      type: Sequelize.BOOLEAN
    },
    count_employee: {
      type: Sequelize.STRING
    },
    total: {
      type: Sequelize.INTEGER
    },
    address: {
      type: Sequelize.STRING
    },
    date_start: {
      type: Sequelize.STRING
    },
    hours: {
      type: Sequelize.INTEGER
    },
    client_id: {
      type: Sequelize.INTEGER
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'type']
      },
    ]
  });

  return Moving;
};