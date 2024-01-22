module.exports = (sequelize, Sequelize) => {
    const faq = sequelize.define("faq", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },    
      question: {      
        type: Sequelize.STRING
      },  
      answer: {      
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
  
    return faq;
  };
  