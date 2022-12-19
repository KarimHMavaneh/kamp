const midlewar = {
    isLogedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("danger", "You need to login first!");
        res.redirect("/login");
    },
// ===================================================================
// midlewar for checking campground owership
 checkOwnerShip(req,res, next){
    //1- check if the user is logged in?
    if(req.isAuthenticated()){        
        cpd.findById(req.params.id, (err, foundCampground)=>{
            if (err) {
                res.redirect("back");
            } else {
                // be careful these tow are not identical behind the scen.
                //console.log(req.user._id);// this one is a string
                //console.log(foundCampground.author.id);// but is one is an object
                // 2-does user own the campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    // res.render("campgrounds/edit", {campground: foundCampground});
                    next();//go ahead and do what you need to do.
                } else {
                    req.flash("danger", "You don't have permission to modify others comments.");
                    res.redirect("back");
                }
            }
         });
        }else{
            req.flash("danger", "You need to login first!");
            res.redirect("back");
        }
    },
    // ===================================================================
    // midlewar for checking comments owership
    vrifyCommentOwnerShip(req,res, next){
        //1- check if the user is logged in?
        if(req.isAuthenticated()){        
            Comment.findById(req.params.comment_id, (err, foundComment)=>{
                if (err) {
                    res.redirect("back");
                } else {                    
                    // 2-does user own the comment?                   
                    if (foundComment.author.id.equals(req.user._id)) {
                        next();//go ahead and do what you need to do.
                    } else {              
                        res.redirect("back");
                    }
                }
            });
        }else{
            // res.send("you need to be logged in to edit a comment")
            res.redirect("back");
        }
    }
};


module.exports = midlewar;

