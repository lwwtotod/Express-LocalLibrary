const Author = require('../models/author')
var async = require('async')
var Book = require('../models/book')
// 显示完整的作者列表
exports.author_list = (req, res) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function(err, list_authors) {
      if (err) {
        return next(err)
      }
      //Successful, so render
      res.render('author_list', {
        title: 'Author List',
        author_list: list_authors,
      })
    })
}

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res) => {
  async.parallel(
    {
      author: function(callback) {
        Author.findById(req.params.id).exec(callback)
      },
      authors_books: function(callback) {
        Book.find({ author: req.params.id }, 'title summary').exec(callback)
      },
    },
    function(err, results) {
      if (err) {
        return next(err)
      } // Error in API usage.
      if (results.author == null) {
        // No results.
        var err = new Error('Author not found')
        err.status = 404
        return next(err)
      }
      // Successful, so render.
      res.render('author_detail', {
        title: 'Author Detail',
        author: results.author,
        author_books: results.authors_books,
      })
    },
  )
}

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => {
  res.send('未实现：作者创建表单的 GET')
}

// 由 POST 处理作者创建操作
exports.author_create_post = (req, res) => {
  res.send('未实现：创建作者的 POST')
}

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => {
  res.send('未实现：作者删除表单的 GET')
}

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => {
  res.send('未实现：删除作者的 POST')
}

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send('未实现：作者更新表单的 GET')
}

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send('未实现：更新作者的 POST')
}
