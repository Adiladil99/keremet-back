module.exports = (sequelize, Sequelize) => {
  const client_history = sequelize.define("client_history", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: Sequelize.INTEGER,
    },
    order_id: {
      type: Sequelize.INTEGER,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'client_id', 'order_id']
      },
    ]
  });

  return client_history;
};
