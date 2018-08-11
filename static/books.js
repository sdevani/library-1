let books = [];

class Book {
	constructor(title, description,checkedOut, quantity) {
		this.title = title;
		this.description = description
		this.checkedOut =  checkedOut
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
		callback(books);
	}
}

books.push(new Book('Harry Potter','Boy Wizard', 0, 1));
books.push(new Book('Lord of the Rings','stupid ring', 0, 1))
books.push(new Book('Pride and Prejudice', 'annoying guy', 0, 1))