const express = require('express')
const app = express()
const {Book} = require('./book.js')
const {Users} = require('./users.js')
const {History} = require('./userhistory.js')
let knex = require('knex')({
	client: 'pg',
	version: '10.5',
	connection: {
		host: '127.0.0.1',
		database: 'library' 
	}
});

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let books = [
new Book('Harry Potter','Boy Wizard', 0, 1, 1),
new Book('Lord of the Rings','stupid ring', 0, 2, 1),
new Book('Pride and Prejudice', 'annoying guy', 0, 3, 1)
]

let users = [
	new Users('Maria', 1),
	new Users('Shehzan', 2),
	new Users('Yogi', 3)
]

let checkOutHistory = [
	new History(1, 1, 1),
	new History(2,2,3),
	new History(3,3,2)
]

let nextIdNumber = 4;
let nextUserID = 4;
let nextCheckOutHistory = 4

app.post('/book', function(req, res) {
	let title = req.body.data.title;
	let description = req.body.data.description;
	let quantity = Number(req.body.data.quantity);
	let checkedOut = 0;

	knex.insert({
		title: title,
		description: description,
		quantity: quantity,
		checkedout: checkedOut
	})
	.returning('*')
	.into('books')
	.then(function(bookObjects) {
		let bookObject = bookObjects[0];
		console.log(bookObject);
		let newBook = new Book(
			bookObject.title,
			bookObject.description,
			bookObject.checkedout,
			bookObject.id,
			bookObject.quantity);
		res.json(newBook);
	});
})

app.put('/book/:bookId', function(req, res) {
	let book;
	books.forEach(function(bookElement) {
		if(bookElement.idNumber == Number(req.params.bookId)) { //explain params here, and is bookId created anywhere or is it new?
			book = bookElement
		}
	});

	console.log(req.body.editedBookData);

	if (req.body.editedBookData.title) {
		book.title = req.body.editedBookData.title;
	}

	if(req.body.editedBookData.description) {
		book.description = req.body.editedBookData.description;
	}

	if(req.body.editedBookData.checkedOut) {
		// book.checkedOut = (req.body.editedBookData.checkedOut === 'true');
		if (Number(req.body.editedBookData.checkedOut) === 1) {
			book.checkedOut = 1;
		} else {
			book.checkedOut = 0;
		}
	}

	if(req.body.editedBookData.quantity) {
		book.quantity = Number(req.body.editedBookData.quantity);
	}

		res.json(book);
})

app.get('/books', function(req, res) {
	knex.select().table('books').then((booksData) => {
		let allBooks = booksData.map((bookData) => {
			return new Book(bookData.title,
							bookData.description,
							bookData.checkedout,
							bookData.id,
							bookData.quantity);
		})
		res.json(allBooks);
	});
})

app.get('/user/:user_id/books', function(req, res){
	let bookResults = [];
	// TODO(maria): Replace for loops with forEach
	for(let i = 0; i < checkOutHistory.length; i++){
		if(checkOutHistory[i].userID === Number(req.params.user_id)){ //explain params here
			let book_id = checkOutHistory[i].bookID
			for(let j = 0; j <  books.length; j++){
				if(book_id === books[j].idNumber){
					bookResults.push(book)
				}
			}
		}
	}
	res.json(bookResults)
})

app.post('/user', function(req, res){
	let foundUser = false
	for(let i = 0; i < users.length; i++){
		if(req.body.name === users[i].name){
			res.json(users[i])
			foundUser = true
		}
	}
	if(!foundUser){
		let newUser = new Users(req.body.name, nextUserID)
		nextUserID++
		users.push(newUser)
		res.json(newUser)
	} 
	
})

app.post("/user/:user_id/books/:book_id", function(req,res){ //Please look at this and why aren't we using the get request above anymore?
	for(let i = 0; i < checkOutHistory.length; i++){
		if(checkOutHistory[i].userID === Number(req.params.user_id)){
			for(let j = 0; j < books.length; j++){
				if(books[j] === req.params.book_id){
					book.checkedOut++
					book.quantity--
				}
			}

		}
	}
})



app.use(express.static('static'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))


