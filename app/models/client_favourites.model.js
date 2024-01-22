module.exports = (sequelize, Sequelize) => {
  const client_favourites = sequelize.define("client_favourites", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: Sequelize.INTEGER,
    },
    master_id: {
      type: Sequelize.INTEGER,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'client_id', 'master_id']
      },
    ]
  });

  return client_favourites;
};
