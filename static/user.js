let users = {};

class User {
	constructor(name) {
		this.name = name;
		this.books = [];
		
	}

	checkoutBook(book, callback){
		this.books.push(book)
		book.checkedOut++;
		callback(book);
	}

	returnBook(book, callback){
		for(let i = 0; i < this.books.length; i++){
			if(book === this.books[i]){
				this.books.pop(book)
			}
		}
		book.checkedOut--;
		callback(book);
	}
	
	getAllBooksByUser(callback){
		callback(this.books);
	}

	// This function will retrieve the user with the given name from the server.
	// If the user is not stored on the server, it will create a new user.
	// Once the user is retrieved, we will create an instance of User and
	// pass it into the callback function.
	// Usage: User.getUserByName("Maria", function(user) {
	//    console.log(user.name);
	// })
	static getUserByName(name, callback){
		callback(users[name]);
	}
}

users['Maria'] = new User('Maria')
users['Shehzan'] = new User('Shehzan')
users['Yogi'] = new User('Yogi')