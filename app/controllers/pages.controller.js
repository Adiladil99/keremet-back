const db = require("../models");
const Op = db.Sequelize.Op;

exports.findByStatic = (req, res) => {
  db.static_info.findOne({
    where: {
      type: req.params.type
    }
  })
    .then(data => {
      
      res.send({data: data || 'Нет данных'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

exports.getMainPage = async (req, res) => {
  const currentDate = new Date();
  try {
    const discounts = await db.discount.findAll({
      where: {
        start_at: {
          [Op.lte]: currentDate, // less than or equal to
        },
        end_at: {
          [Op.gte]: currentDate, // greater than or equal to
        },
      }
    })
    const faqs = await db.faq.findAll()
    const swiper = await db.category.findAll({
      where: {
        slug: {
          [Op.in]: ['makiyazh', 'nogtevoj-servis', 'parikmaherskie-uslugi', 'resnicy']
        }
      },
      include: [
        {
          model: db.sub_category,
          as: 'subcategories',
          include: [
            {
              model: db.service,
              as: 'services',
              include: [
                {
                  model: db.master_services,
                  as: 'masters',
                  include: [
                    {
                      model: db.master,
                      as: 'master'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
    const swiperData = []
    swiper.forEach(el => {
      const transformedData = {
        id: el.id,
        name: el.name,
        slug: el.slug,
        masters: [],
      };

      const addedMasters = new Set();

      // Перебираем подкатегории
      el.subcategories.forEach((subcategory) => {
        // Перебираем услуги
        subcategory.services.forEach((service) => {
          // Перебираем мастеров
          service.masters.forEach((master) => {
            // Добавляем информацию о мастере в массив masters
            if (!addedMasters.has(master.master_id)) {
              transformedData.masters.push({
                id: master.master_id,
                surname: master.master.surname,
                name: master.master.name,
                address: master.master.address,
                phone: master.master.phone,
                image: master.master.image,
                nickname: master.master.nickname,
                price: master.price,
              });
              addedMasters.add(master.master_id);
            }
          });
        });
      });
      swiperData.push(transformedData)
    })
    const reviews = await db.master_comments.findAll({
      include: [
        {
          model: db.client,
          as: 'client',
          attributes: ['surname', 'name', 'id']
        },
        {
          model: db.master,
          as: 'master',
          attributes: ['surname', 'name', 'id']
        },
        {
          model: db.service,
          as: 'service',
          attributes: ['name']
        }
      ]
    })
    res.send({ data: {
      discounts: discounts,
      faq: faqs,
      reviews: reviews,
      swiper: swiperData
    } || 'Нет данных' });
  } catch (error) {
    res.status(500).send({
      message: error || "Some error occurred while retrieving products."
    });
  }
};
