// import express and body parser
import express from "express";
import bodyParser from "body-parser";

// create an instance of express and define port number
const app = express();
const port = 3000;

// make sure the data from post requests gets parsed
app.use(bodyParser.urlencoded({ extended: true }));
// serve static files
app.use(express.static("public"));

// using an array to store the posts since no database is being used
let blogPosts = [];

const getCurrentDate = function () {
  // create a new date object for the current date
  const currentDate = new Date();
  // convert the current date to a string
  const date = currentDate.toLocaleDateString();
  return date;
};

// route for the homepage
app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts });
});

// route for creating a post
app.get("/post", (req, res) => {
  res.render("create-post.ejs");
});

// handle post requests to the create post page
app.post("/post", (req, res) => {
  // create new object for the post
  const newPost = {
    id: blogPosts.length + 1,
    title: req.body.title,
    text: req.body.content,
    author: req.body.name,
    date: getCurrentDate(),
  };

  // push the new blog post into the array
  blogPosts.push(newPost);

  // once new post is added, redirect to the homepage
  res.redirect("/");
});

// route for handling requests to specific blog posts using id
app.get("/edit-post/:id", (req, res) => {
  // find the post by id
  const post = blogPosts.find((post) => post.id === parseInt(req.params.id));

  // render the edit form
  res.render("edit-post.ejs", { post });
});

// handle post requests for edits to posts
app.post("/edit/:id", (req, res) => {
  // find the post by id
  const post = blogPosts.find((post) => post.id === parseInt(req.params.id));

  // update the contents
  if (post) {
    post.title = req.body.title;
    post.author = req.body.name;
    post.text = req.body.content;
  }

  // redirect back to the home page
  res.redirect("/");
});

// handles the deletion of a post by id
app.post("/delete/:id", (req, res) => {
  // filter out the post by id
  blogPosts = blogPosts.filter((post) => post.id !== parseInt(req.params.id));

  // redirect back to the homepage
  res.redirect("/");
});

// listen on the port and log to console that the server is running
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
