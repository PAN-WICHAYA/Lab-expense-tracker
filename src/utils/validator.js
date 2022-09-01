const { readCategory } = require('../dbs/file');
const { ValidationError } = require('./error');

exports.validateCategory = async (Title, Type) => {
  console.log(['expense', 'income'].includes(Type.toLowerCase()));
  if (!Title || !Title.trim()) {
    throw new ValidationError('Title is required');
  }
  if (!Type || !['expense', 'income'].includes(Type.toLowerCase())) {
    throw new ValidationError('Type must be expense or income');
  }
  const currentCategory = await readCategory();
  console.log(currentCategory);
  const checkUniqueTitle = currentCategory.find(
    (item) => item.Title.toLowerCase() === Title.toLowerCase()
  );
  console.log(checkUniqueTitle);
  if (checkUniqueTitle) {
    throw new ValidationError('This title has been added');
  }
};

exports.validationTransaction = async (payee, amount, date, category) => {
  // console.log(date === undefined);
  // console.log(date);
  console.log(new Date(date).getTime());
  // console.log(isNaN(new Date(date).getTime()));
  // console.log(date === undefined || isNaN(new Date(date).getTime()));
  if (!payee || !payee.trim()) {
    throw new ValidationError('Payee is required');
  }
  if (date === undefined || isNaN(new Date(date).getTime())) {
    throw new ValidationError('Invalid date');
  }
  if (typeof amount !== 'number' || amount <= 0) {
    throw new ValidationError('amount must be a number and greater than 0');
  }
  const currentCategory = await readCategory();
  const availableCat = currentCategory.find((item) => item.Title === category);
  if (!availableCat) {
    throw new ValidationError('Unavailable Categories');
  }
};
