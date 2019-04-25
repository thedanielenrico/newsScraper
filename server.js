var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraperdb";

mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/newsScraperdb", { useNewUrlParser: true });

// Routes                       
app.get("/", function (req, res) {
  db.Article.find({}).then(function (data) {
    let hbsObject = {
      article: data
    }

    res.render("index", hbsObject);
  })


})


app.get("/scrape", function (req, res) {

  axios.get("https://www.washingtonpost.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    $("div.headline").each(function (i, element) {

      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .siblings("div.blurb")
        .text();
      // console.log(result.summary);
      db.Article.create(result)
        .then(function (dbArticle) {

          console.log(dbArticle);
        })
        .catch(function (err) {

          console.log(err);
        });
    });


    // res.send("Scrape Complete");
    window.location.replace("/");


  });
});

app.get("/clear", function (req, res) {
  db.Article.deleteMany().then(function (data) {
    res.send("deleted all articles")
    window.location.replace("/");


  })
})


app.get("/articles", function (req, res) {

  db.Article.find({}).then(function (data) {
    let hbsObject = {
      article: data
    }

    res.render("articles", hbsObject);
  })
});


app.get("/articles/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note").then(function (data) {
      res.json(data);
    })
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  console.log(req.body);
  db.Note.create(req.body).then(function (data) {


    return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { note: data._id } }, { new: true });
  });

  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
