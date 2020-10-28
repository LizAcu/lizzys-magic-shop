const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()


const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(methodOverride('_method'))

// app.get('/', (req, res) => {

// })

//sessions
app.use(
 session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false
   })
)


//mongoose connection
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
	console.log('connected to mongo')
})

// controllers

const itemsController = require('./controllers/items.js')
app.use('/items', itemsController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

app.get('/', (req, res) => {
	res.render('home.ejs', { currentUser: req.session.currentUser })
})

app.listen(PORT, () => {
	console.log("Listening")
})