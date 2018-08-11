class Book {
	constructor(title, description,checkedOut, id, quantity) {
		this.title = title;
		this.description = description
		this.checkedOut =  checkedOut
		this.id = id
		this.quantity = quantity
	}

	save(callback){
		let data = {
			data: {
				title: this.title,
				description: this.description,
				checkedOut: this.checkedOut,
				quantity: this.quantity
			}
		}
		// Make an API call to /book and send "data"
		// When it is finished, call the callback function with the data sent from the server
		// When save is used, we send data(like data.title etc;) to server that data is pushed into the books array on the server
		// We retrieve the data from server (books array) and create a new instance of the book for the client and that book is in callback
		$.post('/book', data, function(bookData) {
			let bookInstance = new Book(
				bookData.title,
				bookData.description,
				bookData.checkedOut,
				bookData.idNumber,
				bookData.quantity);
			callback(bookInstance);
		})

	}

	update(callback) {
		$.ajax({
			url: 'book/' + this.id,
			type: 'PUT',
			success: callback,
			data: {
				editedBookData: {
					title: this.title,
					description: this.description,
					checkedOut: this.checkedOut,
					quantity: this.quantity
				}
			}
		})
	}


	static getAllBooks(callback){
		$.get('/books', function(books){
			let bookObject = books.map(function(book){
				return new Book(
					book.title,
					book.description,
					book.checkedOut,
					book.idNumber,
					book.quantity);
			})
			callback(bookObject);
		});
	}
}

