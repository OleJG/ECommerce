const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    
    const categoryData = await Category.findAll({
      // including associated Products
      include: [{ model: Product }],
    });
  
    res.status(200).json(categoryData);
  } catch (e) {
    
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    // getting data for specified category id
    const categoryData = await Category.findByPk(req.params.id, {
      // including associated Products
      include: [{ model: Product }],
    });
    
    return !categoryData
      ? // status 404 with a message
        res.status(404).json({ message: "No category found" })
      : 
        res.status(200).json(categoryData);
  } catch (e) {
    
    res.status(500).json(e);
  }

});

router.post('/', async (req, res) => {
  // 
  try {
    
    const categoryData = await Category.create(req.body);
   
    res.status(200).json(categoryData);
  } catch (e) {
   
    res.status(400).json(e);
  }

});

router.put('/:id', async (req, res) => {
  
  try {
    
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
   
    return !categoryData[0]
      ? // return status 404 with a message
        res.status(404).json({ message: "No category found with that ID" })
      : // else, return categoryData json
        res.status(200).json(categoryData);
  } catch (e) {
    // else, return error
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
   
    const categoryData = await Category.destroy({
      where: { id: req.params.id },
    });
    
    return !categoryData
      ? 
        res.status(404).json({ message: "No category found with that ID" })
      : 
        res.status(200).json(categoryData);
  } catch (e) {
   
    res.status(500).json(e);
  }

});

module.exports = router;
