var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//Сама схема
//Скилы
var TechSchema = new Schema({
  section: String,
  items: [
      {
        name: String,
        value: Number,
      }
      ]
});
//Посты
var PostSchema = new Schema({
  title: String,
  body: String,
  date: String
});
//Работы
var WorkSchema = new Schema({
  name: String,
  tech: String,
  link: String,
  picture: String
});

var UserSchema = new Schema({
  login: String,
  password: {
    type: String,
    set(v) {
      return crypto.createHash('md5').update(v).digest('hex');
    }
  }
});

//Модель
exports.user = mongoose.model('user', UserSchema);
exports.skill = mongoose.model('skill', TechSchema);
exports.post = mongoose.model('post', PostSchema);
exports.work = mongoose.model('work', WorkSchema);