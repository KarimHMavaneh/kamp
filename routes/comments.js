const express = require("express"),
  router = express.Router({ mergeParams: true }); // if you want to access params from the parent router for instance :id or :item in app.js => app.use("/campgroundsPage/:id", commentsRoutes);
(cpd = require("../models/campground")),
  (Comment = require("../models/comment")),
  (midWare = require("../middleware"));

// to add comments to the page we need to create New and CREATE
// routes for this matter which is basically called nested routes
// NEW  /campgrounds/:id/comments/new
// CREATE /campgrounds/:id
// ==============================
// COMMENTS ROUTE
// ==============================
router.get("/new", midWare.isLogedIn, (req, res) => {
  // find campground byID and send it to the create route
  cpd.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundCampground);
      res.render("comments/new", { campground: foundCampground });
    }
  });
});
// CREATE route for comments
// router.post("/campgroundsPage/:id/comments",isLogedIn, (req, res)=>{   MODIFIED VERSION
router.post("/", midWare.isLogedIn, (req, res) => {
  // lookup campground using ID
  cpd.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgroundsPage");
    } else {
      // console.log(req.body.comment); note that "comment" is already a predefined object containing text and author
      // connect new comment to campground
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("danger", "Issued in Error :(");
          console.log(err);
        } else {
          // add username and id to comment
          // console.log("new comment by: ", req.user.username);
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;

          // save  comment
          comment.save();
          foundCampground.comments.push(comment);
          foundCampground.save();

          req.flash("success", "Successfully added your comment.");
          res.redirect("/campgroundsPage/" + foundCampground._id);
        }
      });
    }
  });
});

// COMMENTS EDITE route
router.get("/:comment_id/edit", midWare.vrifyCommentOwnerShip, (req, res) => {
  // we're already have campground id here inside req.params.id
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campgroundID: req.params.id,
        comment: foundComment,
      });
    }
  });
});

// COMMENT UPDATE route
router.put("/:comment_id", midWare.vrifyCommentOwnerShip, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        res.redirect("back");
      } else {
        res.redirect("/campgroundsPage/" + req.params.id);
      }
    }
  );
});
// Comment Destroy route
router.delete("/:comment_id", midWare.vrifyCommentOwnerShip, (req, res) => {
  // findByIdAndRemove
  Comment.findByIdAndDelete(req.params.comment_id, (err) => {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("danger", "You successfully deleted the comment.");
      res.redirect("/campgroundsPage/" + req.params.id);
    }
  });
});

module.exports = router;
