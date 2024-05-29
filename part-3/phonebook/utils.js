const isValidNumber = (phoneNumber) => {
  return /^\d{2,3}-\d+$/.test(phoneNumber);
};

module.exports = { isValidNumber };
