/* eslint-disable no-undef */
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { model: Product },
      ]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id }
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No Category with this id' })
    }
    res.status(200).json(req.body)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log('Attempting to delete category:', req.params.id);
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    })

    console.log('Deletion response:', categoryData);

    if (!categoryData) {
      console.log('No category with this id:', req.params.id);
      res.status(404).json({ message: 'No Category with this id' })
      return;
    }

    console.log('Category deleted successfully:', req.params.id);
    res.status(200).json({ message: 'Category deleted successfully.' })
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json(err)
  }
});

module.exports = router;
