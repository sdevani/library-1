class EditedBooks extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			book: this.props.book,
			bookEdits: {
				title: "",
				description: "",
				quantity: ""
			}
		}
		this.editTitle = this.editTitle.bind(this)
		this.editDescription = this.editDescription.bind(this)
		this.editQuantity = this.editQuantity.bind(this)
		this.updateBook = this.updateBook.bind(this)
	}
		
	editTitle(event){
		let newTitle = event.target.value
		this.state.bookEdits.title = newTitle
		this.setState(this.state)
	}

	editDescription(event){
		let newDescription = event.target.value
		this.state.bookEdits.description = newDescription
		this.setState(this.state)
	}

	editQuantity(event){
		let newQuanity = event.target.value
		this.state.bookEdits.quantity = newQuanity
		this.setState(this.state)
	}

	updateBook(event) {
		event.preventDefault();
		this.state.book.title = this.state.bookEdits.title
		this.state.book.description = this.state.bookEdits.description
		this.state.book.quantity = this.state.bookEdits.quantity
		this.state.book.update(function() {
			ReactDOM.render(<Directory />, document.getElementById('app'))
		});
	}


	render(){
		let updateBook = this.updateBook
		return(
		<div>	
			<h1>Edit Book Information</h1>
			<h2>{this.state.book.title}</h2>
			<p>{this.state.book.description}</p>
			<p>{this.state.book.quantity}</p>
			<form onSubmit = {updateBook}>
				<p>Title: </p><input type="text" value={this.state.bookEdits.title} onChange={this.editTitle}/>
				<p>Description: </p><input type="text" value={this.state.bookEdits.description} onChange={this.editDescription}/>
				<p>Quantity: </p><input type="text" value={this.state.bookEdits.quantity} onChange={this.editQuantity}/>
				<input type = "submit" value = "Submit"/>
			</form>
		</div>	
	)}
}