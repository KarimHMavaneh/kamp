#!/usr/bin/env node
// adding shebang to the file indicates which program to run the file
const express = require("express"),
  app = express(),
  bodyparser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  cpd = require("./models/campground"),
  seedDb = require("./seeds"),
  flash = require("connect-flash"),
  methodOverride = require("method-override"),
  Comment = require("./models/comment"),
  User = require("./models/user");

// seedDb();
//Insert routers
const commentsRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgroundsPage"),
  indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// ==================CREATE New campground=========
// cpd.create({
//     name: "vw bus",
//     image: "https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e5074417d2c78d19249c2_340.jpg",
//     description: "This a fabuleux campground, I highy recommend to visit there one day"
// }, (err, newcpg)=>{
//     if(err){
//         throw err;
//     }else{
//         console.log("new campground has been added to the db");
//     }
// });

//Passport configuration
app.use(
  require("express-session")({
    secret: "The procession of celestial beings",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //this line should be placed after passport.session

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// if we want to pass a midleware to every pages we need to tell app to use it
// and also we can send data to be accessible on every pages/
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.danger = req.flash("danger");
  res.locals.success = req.flash("success");
  next();
});

//we can do even better by reducing the doublications
//by specifying the url(routes ) in app.use we enhance our code a little bit
// because all campgrounds route start with /compgroundsPage so
// we can add that part to app.use rather than to each route
app.use(indexRoutes);
app.use("/campgroundsPage/:id/comments", commentsRoutes);
app.use("/campgroundsPage", campgroundRoutes);
//===============================================================
const port = 3000 || process.env.PORT;
app.listen(port, process.env.IP, () => {
  console.log(`The k-camp Server has started on port ${port}`);
});
