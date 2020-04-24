const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
var jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/demo-bookList', {useNewUrlParser: true, useUnifiedTopology: true});

var bookSchema  = new mongoose.Schema({
	name: String,
	image: String
});

var userSchema  = new mongoose.Schema({
	name: String,
	password: String
},{
    versionKey: false 
});

var Book = mongoose.model('Book', bookSchema, 'books');
var User = mongoose.model('User', userSchema, 'users');


app.get('/api/books', async function(req, res) {
    var books = await Book.find();
    res.json(books);
});

app.get('/api/users', async function(req, res) {
    var users = await User.find();
    res.json(users);
}); 

app.get('/', function(req, res) {
    var token = jwt.sign({
        name: 'Linh'
      }, 'secretToken', { expiresIn: '1h' });
    res.json(token);
});



app.post('/api/users', async function(req, res) {
    await User.create(req.body);
});



app.listen(5000, function() {
    console.log('server listening on port 5000');
});
