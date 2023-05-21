module.exports = (sequelize, Sequelize) => {
  const order_history = sequelize.define("order_history", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_status_id: {
      type: Sequelize.INTEGER
    },
    status: { 
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

  return order_history;
};
