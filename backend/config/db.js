const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/myDbs');
}

module.exports = main;
