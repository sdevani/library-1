class Checkout extends React.Component{
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.updateInputName = this.updateInputName.bind(this);
		this.state = {
			newUser: {
				name: 'Name goes Here',
				book: props.book
			}
		}
		
	}

	handleClick(event) {
			event.preventDefault();
			let name = this.state.newUser.name
			let bookId = this.state.newUser.book
			let newUser = User.getUserByName(name, function(user){ //is this done properly?
				user.checkoutBook(bookId, function(book){
					ReactDOM.render(<Directory/>,
	  				document.getElementById('app'))
				})
			})			
	}

	updateInputName(event){
		this.state.newUser.name = event.target.value
		this.setState(this.state)
	}	


	render(){
		let clickHandler = this.handleClick
		return(
		<div>	
			<h1>Checkout</h1>
			<h2>{this.props.book.title}</h2>
			<h2>{this.props.book.quantity}</h2>
			<form onSubmit = {clickHandler}>
				Name: <input type = 'text' value={this.state.newUser.name} onChange={event => this.updateInputName(event)}/>
				<input type = 'Submit'/>
			</form>
		</div>	
	)}
}