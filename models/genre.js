const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GenreSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 100 },
})

GenreSchema.virtual('url').get(function() {
  return '/catalog/genre/'
})

// 导出 BookInstancec 模型
module.exports = mongoose.model('Genre', GenreSchema)
