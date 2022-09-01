const { v4: uuidv4 } = require('uuid');
const { readCategory, writeCategory } = require('../dbs/file');
const { validateCategory } = require('../utils/validator');

exports.getAllCategory = async (req, res, next) => {
  try {
    currentCategory = await readCategory();
    res.status(200).json({ categories: currentCategory });
  } catch (err) {
    next(err);
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    const { Title, Type } = req.body;
    await validateCategory(Title, Type);
    const newCat = { Title: Title, Type: Type, Id: uuidv4() };
    const oldCat = await readCategory();
    oldCat.unshift(newCat);
    await writeCategory(oldCat);
    res.status(201).json({ categories: newCat });
  } catch (err) {
    next(err);
  }
};

exports.getCatById = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const oldCat = await readCategory();
    const category = oldCat.find((item) => item.Id === Id) ?? null;
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { Title, Type } = req.body;
    const { Id } = req.params;
    const oldCat = await readCategory();
    const newCat = { Title: Title, Type: Type, Id: Id };
    console.log(oldCat);
    console.log(newCat);
    const newCategories = oldCat.map((item) =>
      item.Id === Id ? newCat : item
    );
    // console.log(newCategories);
    await writeCategory(newCategories);
    res.status(200).json({ categories: newCategories });
  } catch (err) {
    next(err);
  }
};

exports.deleteCat = async (req, res, next) => {
  //deleteTodo
  try {
    const { Id } = req.params;
    const oldCat = await readCategory();
    const newCat = oldCat.filter((item) => item.Id !== Id);
    await writeCategory(newCat);
    res.status(200).json({ message: 'success delete' });
  } catch (err) {
    next(err);
  }
};
