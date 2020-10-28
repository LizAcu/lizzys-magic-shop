const express = require('express')
const router = express.Router()
const Items = require('../models/items.js')
const bodyParser = require('body-parser')

const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next() 
	} else {
		res.resdirect('/sessions/new')
	}
}

router.get('/new', (req, res) => {
	res.render('shop/new.ejs', { currentUser: req.session.currentUser }) //folder name
})

router.post('/', (req, res) => {
	console.log(req.body)
	Items.create(req.body, (error, createdItem) => {
		if (error) {
			console.log(error)
		}
		res.redirect('/items') ///items? 
	})
	
})

router.get('/', (req, res)=>{
    Items.find({}, (error, allItems)=>{
        res.render('shop/index.ejs', {
            items: allItems,
            currentUser: req.session.currentUser
        })
    })
})

router.get('/items', (req, res) => {
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
	




	], (err, data) => {
		console.log(Items)
		res.redirect('/items');
	})
});


router.get('/:id/edit', (req, res) => {
  Items.findById(req.params.id, (err, foundItem) => {
    res.render('shop/edit.ejs', {
      items: foundItem,
      currentUser: req.session.currentUser
    })
  })
})



router.put('/:id', isAuthenticated, (req, res) => {

 
  Items.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/items')
  })
})

router.delete('/:id', isAuthenticated, (req, res) => {
  Items.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/items')
  })
})



// router.get('/seed')

module.exports = router