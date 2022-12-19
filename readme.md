#our goals for this lesson:
Step1: Layouts and Basic styling

*Create our header and footer partials 
*Add in Bootstrap

Step2:Creating New Campground 
*setup new coampground
*Setup route to show form 
*Add basic unstyled form

#syle the campgrounds page 
*Add a better header/title
*Make campgrounds display in a grid

#Style the Navbar and Form 
*Add a navbar to all templates
*Style the new campground form

#Add Mongoose
*Install and configure mongoose
*Setup compgournd model
*Use campground model inside of our routes!

#Show page 
*Review the RESTul routes we''ve seen so far 
*Add description to our campground model
*Show db.collection.drop()
*Add a sow route/template

#for our application we need a design pattern in order to well interact with 
our web contents. For this purpose we employ RESTful routes pattern.

RESTful ROUTES


name of the route         HTTP verb             url                                 description
=======================================================================================================================
INDEX PAGE                  GET             "/articles"                show index page to display all the articles

NEW                         GET             "/articles/new"            displays form to create new article

CREATE                      POST            "/articles"                create an article

SHOW                        GET             "/articles/:id"            shows the article based on the given id in the url

EDIT                        GET             "/articles/:id"            display edit form based on the given id in the url    

UPDATE                      PATCH           "/articles/:id"            modifies an article based on the given id in the url

UPDATE                      PUT             "/articles/:id"            replace an existing articles based on the id in the url 

DELETE                      DELETE          "/articles/:id"            deletes one article based on the id in the url


