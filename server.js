const express = require('express')
const app = express()
const {Book} = require('./book.js')
const {Users} = require('./users.js')
const {History} = require('./userhistory.js')

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let nextIDNumber = 0

let books = [
	new Book('Harry Potter','Boy Wizard', 0, 1,1),
	new Book('Lord of the Rings','stupid ring', 0,2, 1),
	new Book('Pride and Prejudice', 'annoying guy', 0,3, 1)
]



app.get('/books', function(req,res){
	res.json(books)
})



app.use(express.static('static'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))


