// Hello book
class Book {
	constructor(title, description,checkedOut, idNumber, quantity) {
		this.title = title;
		this.description = description
		this.checkedOut =  checkedOut
		this.idNumber = idNumber
		this.quantity = quantity
	}
}

exports.Book = Book;
