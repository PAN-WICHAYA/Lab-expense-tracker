const express = require('express');
const transactionController = require('../controllers/transactionController');
router = express.Router();

module.exports = router;

router
  .route('/')
  .get(transactionController.getAllTransaction)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTranById)
  .put(transactionController.updateTransaction)
  .delete(transactionController.deleteTran);
