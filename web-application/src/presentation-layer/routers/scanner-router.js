const express = require('express')
const scannerManager = require('../../business-logic-layer/scanner-manager')

const router = express.Router()

router.get("/", function(request, response){
    scannerManager.getAllScanners(function(errors, scanners){
        const model = {
            errors: errors,
            scanners: scanners
        }
        response.render("scanner.hbs", model)
    })
	
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

router.post('/create', function(request, response){
    const scannerNumber = request.body.scannerNumber
    const scanner = {
        scannerNumber: scannerNumber
    }
    scannerManager.createScanner(scanner, function(errors, id){
        if(errors.length > 0){
            const model = {
                errors: errors,
                id: id
            }
            response.render('create-scanner.hbs', model)
        }else{
            response.redirect('/scanner')
        }
    })
})



module.exports = router