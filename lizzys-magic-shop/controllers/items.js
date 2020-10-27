const express = require('express')
const router = express.Router()
const Items = require('../models/items.js')

const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next() 
	} else {
		res.resdirect('/sessions/new')
	}
}

router.get('/new', (req, res) => {
	res.render('shop/new.ejs', { currentUser: req.session.currentUser })
})

router.post('/', (req, res) => {
	Items.create(req.body, (error, createdItem) => {
		res.redirect('/shop')
	})
	
})

router.get('/shop', (req, res) => {
	Items.create([
	{
		name: 'Disappearing Robe',
		color: 'red',
		description: 'Makes you go poof!'
	},
	{
		name: 'Magic Staff',
		color: 'wood',
		description: 'Can make lots of things happen.'
	}
	// {},




		], (err, data) => {
			res.redirect('/shop');
		})
});

// router.get('/seed')

module.exports = router