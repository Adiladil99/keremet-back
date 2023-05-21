module.exports = (sequelize, Sequelize) => {
  const Cities = sequelize.define("cities", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },    
    name: {      
      type: Sequelize.STRING
    },
    region: { 
      type: Sequelize.ENUM,
      values: ['Акмолинская', 'Астана', 'Алматинская', 'Алматы', 'Актюбинская', 'Восточно-Казахстанская', 'Атырауская', 'Жамбылская', 'Западно-Казахстанская', 'Карагандинская', 'Костанайская', 'Кзылординская', 'Мангистауская', 'Павлодарская', 'Северо-Казахстанская', 'Туркестанская'],
      defaultValue: 'Алматы'
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name']
      },
    ]
  });

  return Cities;
};
