const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	response.render("start.hbs")
})

router.get("/", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")
})

module.exports = router