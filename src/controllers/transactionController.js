const { v4: uuidv4 } = require('uuid');
const {
  readTransaction,
  writeTransaction,
  readCategory,
} = require('../dbs/file');
const { validationTransaction } = require('../utils/validator');
exports.getAllTransaction = async (req, res, next) => {
  try {
    currentTransaction = await readTransaction();
    res.status(200).json({ transactions: currentTransaction });
  } catch (err) {
    next(err);
  }
};
exports.createTransaction = async (req, res, next) => {
  try {
    const { payee, amount, date, category } = req.body;
    await validationTransaction(payee, amount, date, category);
    const oldCat = await readCategory();
    const categoryID = oldCat.find((item) => item.Title === category);

    const newTrans = {
      payee: payee,
      amount: amount,
      category: categoryID.Id,
      date: date,
      id: uuidv4(),
    };
    const oldTrans = await readTransaction();
    oldTrans.unshift(newTrans);
    await writeTransaction(oldTrans);
    res.status(201).json({ transactions: newTrans });
  } catch (err) {
    next(err);
  }
};
exports.getTranById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldTrans = await readTransaction();
    const transaction = oldTrans.find((item) => item.id === id) ?? null;
    res.json({ transaction });
  } catch (err) {
    next(err);
  }
};
exports.updateTransaction = async (req, res, next) => {
  try {
    const { payee, amount, date, category } = req.body;
    await validationTransaction(payee, amount, date, category);
    const { id } = req.params;
    const oldTrans = await readCategory();
    const oldCat = await readCategory();
    const categoryID = oldCat.find((item) => item.Title === category);
    const newTran = {
      payee: payee,
      amount: amount,
      date: date,
      category: categoryID.Id,
      id: id,
    };

    const newTransactions = oldTrans.map((item) =>
      item.id === id ? newTran : item
    );
    // console.log(newCategories);
    await writeTransaction(newTransactions);
    res.status(200).json({ transactions: newTransactions });
  } catch (err) {
    next(err);
  }
};
exports.deleteTran = async (req, res, next) => {
  //deleteTodo
  try {
    const { id } = req.params;
    const oldTran = await readTransaction();
    const newTran = oldTran.filter((item) => item.id !== id);
    await writeTransaction(newTran);
    res.status(200).json({ message: 'success delete' });
  } catch (err) {
    next(err);
  }
};
