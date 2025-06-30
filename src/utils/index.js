const validators = {
  auth: require("./validators/auth"),
  user: require("./validators/user"),
  restaurant: require("./validators/restaurant"),
  review: require("./validators/review"),
  comment: require("./validators/comment"),
};

module.exports = {
  ...validators,
};
