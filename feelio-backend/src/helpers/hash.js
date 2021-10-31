const bcrypt = require("bcryptjs");

const create = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const verify = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports.hash = { create, verify };
