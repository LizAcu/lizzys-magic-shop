const express = require('express')
const router = express.Router()
const Items = require('../models/items.js')
const bodyParser = require('body-parser')

const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
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
		description: 'making you go poof (WHERE you go may vary)!',
		image: 'https://www.picclickimg.com/d/l400/pict/223552126732_/Black-Hooded-Velvet-Wizard-Cloak-Cape-Men-Halloween-With.jpg'
	},
	{
		name: 'Magic Staff',
		color: 'wooden',
		description: 'levitating, and making lots of things happen!',
		image: 'https://i.pinimg.com/originals/9a/04/a8/9a04a8ad79de4ad75ccfe0976d8106fc.jpg'

	},
	{
		name: 'Magic Hat',
		color: 'no color',
		description: 'pulling out desserts like you would a rabbit! WARNING: your dessert might bite back.',
		image: 'https://www.laphamsquarterly.org/sites/default/files/images/roundtable/hatmain_0.jpg'
	},
	{
		name: 'Spicy runes',
		color: 'wooden', 
		description: 'alphabetizing your life! YES we mean literally!',
		image: 'https://i.pinimg.com/originals/a4/64/b3/a464b3acca99b7bb5b000a0aab4475de.jpg'
	},
	{
		name: 'Galaxy in a jar',
		color: 'starry',
		description: 'diving in and exploring this tiny galaxy, yes, you CAN jump in!',
		image: 'https://storage.googleapis.com/little-passports-blog/hubble_friday_08072015.jpg'
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



router.put('/:id', isAuthenticated, (req, res) => { //isAuthenticated,

 
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