class User {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		
	}

	checkoutBook(book){
		this.books.push(book)
		//can I create a books array on the client side?
		//What are we going to do for this portion? Confused..
	}

	returnBook(book){
		for(let i = 0; i < this.books.length; i++){
		if(book === this.books[i]){
		this.books.pop(book)
			}
		}
	}
	
	getAllBooksByUser(callback){
		$.get("/user/" + this.id + "/books", function(books) {
			let bookObjects = books.map(function(book) {
				return new Book(
					book.title,
					book.description,
					book.checkedOut,
					book.id,
					book.quantity
				)
			})
			callback(bookObjects);	
		})
	}

	checkoutBook(bookId, callback){ //why aren't we using getAllBooksByUser anymore?
		$.post("/user/" + this.id + "/book/"){
			let bookObject = new Book(
				book.title,
				book.description,
				book.id,
				book.quantity
			)
		}
	}		

	static getAllUsers(){
		return users
	}

	// This function will retrieve the user with the given name from the server.
	// If the user is not stored on the server, it will create a new user.
	// Once the user is retrieved, we will create an instance of User and
	// pass it into the callback function.
	// Usage: User.getUserByName("Maria", function(user) {
	//    console.log(user.name);
	// })
	static getUserByName(name, callback){
		$.post('/user', {name:name}, function(userData){
			let user = new User(
				userData.name,
				userData.id,
				userData.books)
			// Callback is in this position because it will run when the data is
			// actually available
			callback(user)
		})
	}
}

