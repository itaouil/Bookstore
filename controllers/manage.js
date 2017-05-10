'use strict';

var Book     = require("../models/book");
var Category = require("../models/category");

module.exports = function (router) {

    router.get('/', function (req, res) {
        res.render('manage/index');
    });

    router.get('/books', function (req, res) {
        Book.find({}, function(err, books) {
          if (err) throw err
          res.render('manage/books/index', {books: books});
        });
    });

    router.get('/books/add', function (req, res) {
        Category.find({}, function(err, categories) {
          if (err) throw err
          res.render('manage/books/add', {categories: categories});
        });
    });

    router.post('/books/add', function (req, res) {

        // Get fields
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title === "" || price === "") {
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        if (isNaN(price)) {
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        var newBook = new Book({
          title       : title,
          category    : category,
          description : description,
          author      : author,
          publisher   : publisher,
          price       : price,
          cover       : cover
        });

        newBook.save(function(err) {
          if (err) {
            console.log(err);
          }
          res.location('/manage/books/add');
          res.redirect('/manage/books/add');
        });

    });

    router.get('/books/edit/:id', function(req, res) {
        Category.find({}, function(err, categories) {
            if (err) throw err;
            Book.findOne({_id: req.params.id}, function(err, book) {
                if (err) throw err;
                res.render('manage/books/edit', {book: book, categories: categories});
            })
        });
    });

    router.post('/books/edit/:id', function(req, res) {
      // Get fields
      var title = req.body.title && req.body.title.trim();
      var category = req.body.category && req.body.category.trim();
      var author = req.body.author && req.body.author.trim();
      var publisher = req.body.publisher && req.body.publisher.trim();
      var price = req.body.price && req.body.price.trim();
      var description = req.body.description && req.body.description.trim();
      var cover = req.body.cover && req.body.cover.trim();

      if (title === "" || price === "") {
          res.location('/manage/books/edit');
          res.redirect('/manage/books/edit');
      }

      if (isNaN(price)) {
          res.location('/manage/books/edit');
          res.redirect('/manage/books/edit');
      }

      console.log("And the ID is:", req.params.id);

      Book.update({_id: req.params.id}, {
          title       : title,
          category    : category,
          description : description,
          author      : author,
          publisher   : publisher,
          price       : price,
          cover       : cover
      }, function(err) {
          if (err) throw err;
          res.location('/manage/books');
          res.redirect('/manage/books');
      });

    });

    router.get('/books/delete/:id', function (req, res) {
        Book.remove({_id: req.params.id}, function(err) {
          if (err) throw err;
          res.location('/manage/books');
          res.redirect('/manage/books');
        });
    });

    router.get('/categories', function (req, res) {
        res.render('manage/categories/index');
    });

};
