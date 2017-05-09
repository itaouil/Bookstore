'use strict';

var Book     = require('../models/book');
var category = require('../models/category');

module.exports = function (router) {

    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/details/:id', function (req, res) {

        Book.findOne({_id: req.params.id}, function(err, book) {
          res.render('books/details', {book: book});
        });

    });

};
