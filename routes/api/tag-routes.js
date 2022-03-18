const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: { model: ProductTag, attributes: []},
        as: 'tagged_products'
      }
    ]
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: { model: ProductTag, attributes: []},
        as: 'tagged_products'
      }
    ]
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No tag with this ID found' });
      return;
    }
    res.json(dbData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No tag with this ID found' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No tag with this ID found' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
