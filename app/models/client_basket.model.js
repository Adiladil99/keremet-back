module.exports = (sequelize, Sequelize) => {
  const client_basket = sequelize.define("client_basket", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: Sequelize.INTEGER,
    },
    master_service_id: {
      type: Sequelize.INTEGER,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'client_id', 'master_service_id']
      },
    ]
  });

  return client_basket;
};
