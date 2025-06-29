const validators = {
  auth: require("./validators/auth"),
  user: require("./validators/user"),
};

module.exports = {
  ...validators,
};
