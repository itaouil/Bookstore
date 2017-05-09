'use strict';

var Book = require('../models/book');

module.exports = function (router) {

    router.get('/', function (req, res) {
        Book.find({}, function(err, books) {
          if (err) console.log(err);

          else {
            books.forEach(function(book) {
              // Sets new property
              book.truncText = book.truncText(50);
            });
            res.render('index', {books: books});
          }
        });
    });

};
