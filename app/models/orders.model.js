module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: { 
      type: Sequelize.ENUM('Документ', 'Посылка'),
      defaultValue: 'Документ'
    },
    type_payment: { 
      type: Sequelize.ENUM('При получений', 'При отправке', 'С банковской картой'),
      defaultValue: 'При получений'
    },
    door_to_door: {
      type: Sequelize.BOOLEAN
    },
    weight: {      
      type: Sequelize.FLOAT
    },
    length: {
      type: Sequelize.FLOAT
    },
    width: {      
      type: Sequelize.FLOAT
    },
    height: {
      type: Sequelize.FLOAT
    },
    sender_city: {
      type: Sequelize.STRING
    },
    recipient_city: {
      type: Sequelize.STRING
    },
    sender_address: {
      type: Sequelize.STRING
    },
    recipient_address: {
      type: Sequelize.STRING
    },
    sender_postcode: {
      type: Sequelize.STRING
    },
    recipient_postcode: {
      type: Sequelize.STRING
    },
    send_date: {
      type: Sequelize.DATE
    },
    sender_name: {
      type: Sequelize.STRING
    },
    recipient_name: {
      type: Sequelize.STRING
    },
    sender_phone: {
      type: Sequelize.STRING
    },
    recipient_phone: {
      type: Sequelize.STRING
    },
    track_number: {
      type: Sequelize.STRING
    },
    comments: {
      type: Sequelize.TEXT
    },
    map_data: {
      type: Sequelize.TEXT
    }
  }, {
    hooks: {
      beforeValidate: (order, options) => {
        if (!order.track_number) {
          // Генерация уникального значения для track_number
          order.track_number = generateUniqueTrackNumber();
        }
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['id', 'type', 'type_payment']
      },
    ]
  });

  return Orders;
};

function generateUniqueTrackNumber() {
  const timestamp = new Date().getTime();
  const randomDigits = Math.floor(Math.random() * 1000);
  return `TN-${timestamp}-${randomDigits}`;
}