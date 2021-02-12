const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const autoIncrement = require('mongoose-auto-increment')

const Schema = mongoose.Schema;
mongoose.set('useUnifiedTopology', true);
//-------------------CONNECTION------------------------
var dbURI = 'mongodb+srv://praveen:12345@cluster0.5hl3s.mongodb.net/test123?retryWrites=true&w=majority'
var db = mongoose.connect(dbURI, { useNewUrlParser: true })
//  CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI)
})
//  If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
})

//  When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})
//---------------------------------------------------

const dbConnection = mongoose.connection
autoIncrement.initialize(dbConnection)

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, required: true },
  profession: { type: String, required: true },
});

const PetSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String, required: true }
})

module.exports.users = mongoose.model("users", UserSchema);
module.exports.pets = mongoose.model("pets", PetSchema);
