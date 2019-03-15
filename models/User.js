const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const User = new Schema({
  email: String,
  password: String,
  ideas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Idea"
    }
  ]
});

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
  // removed local from local.password
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("User", User);
