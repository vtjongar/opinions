const {Idea, Opinion} = require("../models/Idea")
const User = require("../models/User")

module.exports = {
    show: (req, res) => {
      Idea.findOne({ _id: req.params.id })
      .populate("author")
      .exec(function(err, idea) {
        Opinion.populate(idea.opinions, { path: "author" }, function(
          err,
          opinions
        ) {
          idea.opinions = opinions
          res.render("idea/show", idea)
        })
      })
  },
    new: (req, res) => {
      User.find({}).then(users => {
        res.render("idea/new", { users })
      })
    },
    create: (req, res) => {
      console.log('body', req.body)
      Idea.create({
        content: req.body.idea.content,
        author: req.body.author
      }).then(idea => {
        console.log('idea ', idea)
        User.findOne({ _id: req.body.author }).then(user => {
          user.ideas.push(idea)
          user.save(result => {
            console.log(result)
            res.redirect(`/idea/${idea._id}`)
          })
        })
      })
    },
    update: (req, res) => {
      console.log('body', req.body)
      let { content, author } = req.body;
      Idea.findOne({ _id: req.params.id }).then(idea => {
        idea.opinions.push({
          content,
          author
        });
        idea.save(err => {
          res.redirect(`/idea/${idea._id}`);
        });
      });
    },
    delete: (req, res) => {
      Idea.findOneAndRemove({ _id: req.params.id }).then(idea => {
        res.redirect('/')
      });
    },
  requireAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  }
};