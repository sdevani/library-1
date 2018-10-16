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

let nextAvailableBookId = 1;
let books = [
	new Book("Harry Potter", "Boy who lived", 0, nextAvailableBookId++, 1),
	new Book("Lord of the Rings", "Jewelry", 0, nextAvailableBookId++, 2),
	new Book("Pride and Prejudice", "Ego", 0, nextAvailableBookId++, 2),
];

let nextAvailableUserId = 1;
let users = {
	"Shehzan": new Users("Shehzan", nextAvailableUserId++),
	"Maria": new Users("Maria", nextAvailableUserId++),
};

let nextAvailableCheckoutHistoryId = 1;
let checkoutHistoryRecords = [];

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

app.post('/user', function(req, res) {
	let userName = req.body.userName;
	if (!users[userName]) {
		users[userName] = new Users(userName, nextAvailableUserId++);
	}
	res.json(users[userName]);
})

app.post('/book', function(req, res) {
	let title = req.body.data.title;
	let description = req.body.data.description;
	let id = nextAvailableBookId++;
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
	.then(function(bookObject) {
		let newBook = new Book(
			bookObject.title,
			bookObject.description,
			bookObject.checkedout,
			bookObject.id,
			bookObject.quantity);
		res.json(newBook);
	});
})

app.post('/user/:user_id/book/:book_id', function(req, res) {
	let book;
	let user;
	books.forEach(function(bookElem) {
		if (bookElem.id === Number(req.params.book_id)) {
			book = bookElem;
		}
	})
	if(!book) {
		res.json({error: "Book is not found!"});
		return;
	}

	for (let userName in users) {
		let userElem = users[userName];
		if (userElem.id === Number(req.params.user_id)) {
			user = userElem;
		}
	}
	if (!user) {
		res.json({error: "User is not found"});
		return;
	}

	book.checkedOut++;
	let checkedOutHistory = new History(
		nextAvailableCheckoutHistoryId++,
		user.id,
		book.id);
	checkoutHistoryRecords.push(checkedOutHistory);

	res.json({success: "Book was checked out."});
})

app.get('/user/:user_id/books', function(req, res) {
	let user;

	for (let userName in users) {
		let userElem = users[userName];
		if (userElem.id === Number(req.params.user_id)) {
			user = userElem;
		}
	}
	if (!user) {
		res.json({error: "User is not found"});
		return;
	}

	let usersBooks = checkoutHistoryRecords.filter(function(record) {
		return record.userId === user.id;
	}).map(function(record) {
		let book;
		books.forEach(function(bookElem) {
			if (bookElem.id === record.bookId) {
				book = bookElem;
			}
		})
		return book;
	}).filter(function(book) {
		return book !== undefined;
	});

	res.json({
		success: "Books were found.",
		books: usersBooks
	});
})

app.delete('/user/:user_id/book/:book_id', function(req, res) {

	for (let i = 0; i < checkoutHistoryRecords.length; i++) {
		let historyRecord = checkoutHistoryRecords[i];
		if (historyRecord.userId === Number(req.params.user_id)
			&& historyRecord.bookId === Number(req.params.book_id)) {
			checkoutHistoryRecords.splice(i, 1);
		}
	}

	books.forEach(function(bookElem) {
		if (bookElem.id === Number(req.params.book_id)) {
			bookElem.checkedOut--;
		}
	})

	res.json({success: "Deleted history record."});
})


app.use(express.static('static'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))


