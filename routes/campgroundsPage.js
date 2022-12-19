const express = require("express"),
  router = express.Router({ mergeParams: true }),
  cpd = require("../models/campground"),
  midWare = require("../middleware");

// =============================================================
//This is our INDEX route---->shows all campgrounds
// =============================================================
router.get("/", (req, res) => {
  //retrieve all the campgrounds from the db and then render the file
  // console.log("loged in user :", req.user); //here is how we can check if a user is loged in or not
  cpd.find({}, (err, allCampgrounds) => {
    if (err) {
      throw err;
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds,
        currentUser: req.user,
      });
    }
  });
});
// ===============================================================
//This is our CREATE route---->add new campground to the DB
// ===============================================================
router.post("/", midWare.isLogedIn, (req, res) => {
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.desc,
    author: author,
  };
  // console.log(req.user);
  //create new campground and save it to the database
  cpd.create(newCampground, (err, newcpg) => {
    if (err) {
      throw err;
    } else {
      // console.log(newcpg);
      res.redirect("campgroundsPage");
    }
  });
});
// =============================================================
//This is our NEW route---->shows the create new campground form
// =============================================================
router.get("/new", midWare.isLogedIn, (req, res) => {
  res.render("campgrounds/new.ejs");
});
// =============================================================
//This is our SHOW route---->shows the create new campground form
//NOT
// =============================================================
router.get("/:id", (req, res) => {
  //we need to send comments to the show page so we neew to populate and exec them
  cpd
    .findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        throw err;
      } else {
        // now we shorld have comments array returnt back with foundCampground
        // console.log(foundCampground);
        // render SHOW template whith the foundCampground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// EDIT campground route
router.get("/:id/edit", midWare.checkOwnerShip, (req, res) => {
  cpd.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

// UPDATE   campground route
router.put("/:id", midWare.checkOwnerShip, (req, res) => {
  // find and update the correct campground
  cpd.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedcampground) => {
      if (err) {
        res.redirect("/campgroundsPage");
      } else {
        //redirect to the show page
        res.redirect("/campgroundsPage/" + req.params.id);
      }
    }
  );
});
// DELETE campground route
router.delete("/:id", midWare.checkOwnerShip, (req, res) => {
  // find the campgroud by id and destroy it
  cpd.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.redirect("/campgroundsPage");
    } else {
      res.redirect("/campgroundsPage");
    }
  });
  // res.send("your trying to delete sth");
});

module.exports = router;
