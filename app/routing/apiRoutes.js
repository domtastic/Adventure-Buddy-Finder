let buddies = require("../data/friend");

module.exports = function(app) {
  app.get("/api/buddies", (req, res) => {
    res.json(buddies);
  });
};
