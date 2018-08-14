class Book {
	constructor(title, description,checkedOut, id,quantity) {
		this.title = title;
		this.description = description
		this.checkedOut =  checkedOut
		this.id = id
		this.quantity = quantity
	}

	save(callback){
		books.push(this);
		callback(this);
	}

	update(callback) {
		callback(this);
	}


	static getAllBooks(callback){
		$.get('/books',function(data){
			let books = data.map(function(book){
				return new Book(book.title,
								book.description,
								Number(book.checkedOut),
								Number(book.id),
								Number(book.quantity));
			})
			callback(books)
		})
	}
}

