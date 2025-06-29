const validators = {
  auth: require("./validators/auth"),
  user: require("./validators/user"),
  restaurant: require("./validators/restaurant"),
};

module.exports = {
  ...validators,
};
