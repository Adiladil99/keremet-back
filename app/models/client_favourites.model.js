module.exports = (sequelize, Sequelize, master, client) => {
  const client_favourites = sequelize.define("client_favourites", {
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
    client_id: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: client,
        key: 'id',
      }
    },
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
