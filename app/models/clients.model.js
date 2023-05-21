module.exports = (sequelize, Sequelize) => {
  const Clients = sequelize.define("clients", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fio: {
      type: Sequelize.STRING,
      allowNull: false
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
    password: {
      type: Sequelize.STRING
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'email', 'phone']
      },
    ]
  });

  return Clients;
};
