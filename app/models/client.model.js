module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
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
    image: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATE
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

  return Client;
};
