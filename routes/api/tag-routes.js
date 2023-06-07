/* eslint-disable no-undef */
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!tagsData) {
      res.status(404).json({ message: 'No tags found with this id' });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.update(req.body, {
      where: { id: req.params.id, }
    });
    await ProductTag.update(
      { tag_name: req.body.tag_name },
      { where: { tag_id: req.params.id } }
    ),
      res.status(200).json({ message: 'Tag updated successfully', tagsData })
  } catch (err) {
    res.status(500).json(err);
  }
})


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log('Attempting to delete tag:', req.params.id);
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    })

    console.log('Deletion response:', tagData);

    if (!tagData) {
      console.log('No tag with this id:', req.params.id);
      res.status(404).json({ message: 'No tag with this id' })
      return;
    }

    console.log('Tag deleted successfully:', req.params.id);
    res.status(200).json({ message: 'Tag deleted successfully.' })
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json(err)
  }
});

module.exports = router;
