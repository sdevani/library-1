const express = require('express')
const app = express()
const {Book} = require('./book.js')
const {Users} = require('./users.js')
const {History} = require('./userhistory.js')

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.use(express.static('static'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))


