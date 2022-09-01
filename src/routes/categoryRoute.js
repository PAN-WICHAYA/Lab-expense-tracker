const express = require('express');
const categoryController = require('../controllers/categoryController');
router = express.Router();

module.exports = router;

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);

router
  .route('/:Id')
  .get(categoryController.getCatById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCat);

//http://localhost:8081/category/
// read create  : GET , POST
//http://localhost:8081/category/:id
// update, delete, read by id : PUT DELETE GET
//http://localhost:8081/transaction/
// read create  : GET , POST
//http://localhost:8081/transaction/:id
// update, delete, read by id : PUT DELETE GET
