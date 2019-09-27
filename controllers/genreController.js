const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
// 显示完整的作者列表
exports.genre_list = (req, res, next) => {
  Genre.find()
    .populate('Genre')
    .exec(function(err, list_genre) {
      if (err) {
        return next(err)
      }
      // Successful, so render
      res.render('genre_list', {
        title: '图书分类列表',
        genre_list: list_genre,
      })
    })
}

// 为每位作者显示详细信息的页面
exports.genre_detail = (req, res, next) => {
  async.parallel(
    {
      genre: function(callback) {
        Genre.findById(req.params.id).exec(callback)
      },

      genre_books: function(callback) {
        Book.find({ genre: req.params.id }).exec(callback)
      },
    },
    function(err, results) {
      if (err) {
        return next(err)
      }
      if (results.genre == null) {
        // No results.
        var err = new Error('Genre not found')
        err.status = 404
        return next(err)
      }
      // Successful, so render
      res.render('genre_detail', {
        title: 'Genre Detail',
        genre: results.genre,
        genre_books: results.genre_books,
      })
    },
  )
}

// 由 GET 显示创建作者的表单
exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', { title: 'Create Genre' })
}

// 由 POST 处理作者创建操作
exports.genre_create_post = (req, res, next) => [
  // Validate that the name field is not empty.
  body('name', 'Genre name required')
    .isLength({ min: 1 })
    .trim(),

  // Sanitize (trim and escape) the name field.
  sanitizeBody('name')
    .trim()
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre({ name: req.body.name })

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec(function(err, found_genre) {
        if (err) {
          return next(err)
        }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url)
        } else {
          genre.save(function(err) {
            if (err) {
              return next(err)
            }
            // Genre saved. Redirect to genre detail page.
            res.redirect(genre.url)
          })
        }
      })
    }
  },
]

// 由 GET 显示删除作者的表单
exports.genre_delete_get = (req, res, next) => {
  res.send('未实现：作者删除表单的 GET')
}

// 由 POST 处理作者删除操作
exports.genre_delete_post = (req, res, next) => {
  res.send('未实现：删除作者的 POST')
}

// 由 GET 显示更新作者的表单
exports.genre_update_get = (req, res, next) => {
  res.send('未实现：作者更新表单的 GET')
}

// 由 POST 处理作者更新操作
exports.genre_update_post = (req, res, next) => {
  res.send('未实现：更新作者的 POST')
}
