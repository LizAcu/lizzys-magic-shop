const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()

const app = express()


const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


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
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
	console.log('connected to mongo')
})

// controllers

const itemsController = require('./controllers/items.js')
app.use('/items', itemsController)


app.get('/', (req, res) => {
	res.render('home.ejs', { currentUser: req.session.currentUser })
})

app.listen(PORT, () => {
	console.log("Listening")
})