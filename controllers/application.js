const { Idea } = require("../models/Idea")
module.exports = {
    index: (req, res) => {
      Idea.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author")
      .then(ideas => {
        res.render("app/index", { ideas });
      })
    }
  };
