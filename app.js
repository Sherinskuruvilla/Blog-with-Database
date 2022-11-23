//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose =require("mongoose");

const homeStartingContent = "Welcome to Sherin and Jerry's Blog. Every Week posts new Blog.Its all about Food and Travel......";
const aboutContent = "We are a couple who loves to travel and explore food in our leisure time....Currently residing in Berlin and exploring Europe..";
const contactContent = "contact us : sherinskuruvilla@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect('mongodb://127.0.0.1:27017/blogDB',{useNewUrlParser: true});
const postSchema = new mongoose.Schema({
  title:String,
  content: String
});
const Post = mongoose.model("Post",postSchema);


app.get("/", function(req, res){

  Post.find({},function(err,posts)
{
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post =new Post( {
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err)
{
  if(!err)
  {
      res.redirect("/");
  }
});



});

app.get("/posts/:postId", function(req, res){

  const requestedPostId =req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post)
{

    res.render("post",{
      title:post.title,
      content:post.content
    });


});



});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
