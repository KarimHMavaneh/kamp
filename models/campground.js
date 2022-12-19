const mongoose = require("mongoose");
//create a db if we haven't one else connect to it

//mongodb+srv://kcamp:<password>@cluster0.yxjvg.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb://localhost/yelp_camp_v6
//depricated url
//onst uri =
//  "mongodb+srv://cpd:1234@cluster0.yxjvg.mongodb.net/cpd?retryWrites=true&w=majority";

  const uri = "mongodb+srv://mydata:GeNWZXPxghp3H00I@cluster0.gmubaug.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//define our schema
var campgroudSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
//compile the schema into a model
module.exports = mongoose.model("cpd", campgroudSchema);
