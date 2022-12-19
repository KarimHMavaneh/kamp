const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

router.get("/", (req, res) => {
  res.render("landing");
});

//=================
//AUTH ROUTE
//=================
// show register form
router.get("/register", (req, res) => {
  res.render("register");
});
// this rout will handle sign up logic
router.post("/register", (req, res) => {
  // res.send("sing you up");

  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("danger", err.message);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash(
          "success",
          `Nice to see you  ${user.username} on the Campgrounds page`
        );
        res.redirect("/campgroundsPage");
      });
    }
  });
});

// show login form
router.get("/login", (req, res) => {
  res.render("login");
});
//handling login logic
// the way login works is actually by using a midlware
// app.post("/login", midlewar, callback)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgroundsPage",
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash(
      "success",
      `Welcome back  ${user.username} to the Campgrounds page`
    );
  }
);

// logout route
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "You Logged out Successfully");
  res.redirect("/campgroundsPage");
});

module.exports = router;
