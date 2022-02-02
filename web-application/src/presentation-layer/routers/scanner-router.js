const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	response.render("scanner.hbs")
})

router.get('/delete', function(request, response){
    response.render('delete-scanner.hbs')
})

router.get('/update', function(request, response){
    response.render('update-scanner.hbs')
})

router.get('/create', function(request, response){
    response.render('create-scanner.hbs')
})



module.exports = router