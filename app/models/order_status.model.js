module.exports = (sequelize, Sequelize) => {
  const order_status = sequelize.define("order_status", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },    
    order_id: {      
      type: Sequelize.INTEGER
    },
    client_id: {      
      type: Sequelize.INTEGER
    },
    driver_id: {      
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: { 
      type: Sequelize.ENUM,
      values: ['Ожидает подтверждений', 'Заказ подтвержден', 'Заказ отправлен', 'В пункте распределения', 'Заказ прибыл в место назначение', 'Доставлено'],
      defaultValue: 'Ожидает подтверждений'
    },
    payment_status: { 
      type: Sequelize.ENUM,
      values: ['Ожидает оплаты', 'Оплачено', 'Отменено'],
      defaultValue: 'Ожидает оплаты'
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'order_id', 'client_id', 'driver_id', 'status']
      },
    ]
  });

  return order_status;
};
