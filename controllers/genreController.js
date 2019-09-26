const Genre = require('../models/genre')
var Book = require('../models/book')
var async = require('async')
// 显示完整的作者列表
exports.genre_list = (req, res) => {
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
exports.genre_detail = (req, res) => {
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
exports.genre_create_get = (req, res) => {
  res.send('未实现：作者创建表单的 GET')
}

// 由 POST 处理作者创建操作
exports.genre_create_post = (req, res) => {
  res.send('未实现：创建作者的 POST')
}

// 由 GET 显示删除作者的表单
exports.genre_delete_get = (req, res) => {
  res.send('未实现：作者删除表单的 GET')
}

// 由 POST 处理作者删除操作
exports.genre_delete_post = (req, res) => {
  res.send('未实现：删除作者的 POST')
}

// 由 GET 显示更新作者的表单
exports.genre_update_get = (req, res) => {
  res.send('未实现：作者更新表单的 GET')
}

// 由 POST 处理作者更新操作
exports.genre_update_post = (req, res) => {
  res.send('未实现：更新作者的 POST')
}
