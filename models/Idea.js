const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Opinion = new Schema({
  content: String,
  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Idea = new Schema({
  content: String,
  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  opinions: [Opinion]
});

module.exports = {
  Idea: mongoose.model("Idea", Idea),
  Opinion: mongoose.model("Opinion", Opinion)
};
