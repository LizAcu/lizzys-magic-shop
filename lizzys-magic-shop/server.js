const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {

})


app.listen(PORT, () => {
	console.log("Listening")
})