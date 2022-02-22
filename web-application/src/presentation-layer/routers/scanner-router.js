const express = require('express')
//const scannerManager = require('../../business-logic-layer/scanner-manager')

module.exports = function({scannerManager}){

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

    router.get('/update/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            const model = {
                errors: errors,
                scanner: scanner[0]
            }
            
            response.render('update-scanner.hbs', model)
        })
    })

    router.get('/delete/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            const model = {
                errors: errors,
                scanner: scanner[0]
            }
            response.render('delete-scanner.hbs', model)
        })
    })

    router.get('/borrow/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            const model = {
                errors: errors,
                scanner: scanner[0]
            }
            response.render('borrow-scanner.hbs', model)
        })
    }),

    router.get('/return/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            const model = {
                errors: errors,
                scanner: scanner[0]
            }
            response.render('return-scanner.hbs', model)
        })
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

    router.post('/update/:id', function(request, response){
        const scannerNumber = request.body.scannerNumber
        const scannerId = request.params.id
        const scanner = {
            scannerId: scannerId,
            scannerNumber: scannerNumber
        }
        scannerManager.updateScannerById(scanner, function(errors, id){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    scanner: scanner,
                    id: id
                }
                response.render('update-scanner.hbs', model)
            }else{
                response.redirect('/scanner')
            }
            
        })
    })
    router.post('/delete/:id', function(request, response){
        const scannerId = request.params.id
        scannerManager.deleteScannerById(scannerId, function(errors){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    id: id
                }
                response.render('delete-scanner.hbs', model)
            }else{
                response.redirect('/scanner')
            }
        })
    })

    router.post('/borrow/:id', function(request, response){
        const scannerId = request.params.id
        const scannerNumber = request.params.scannerNumber
        scannerManager.borrowScannerById(scannerId, function(errors){
            if(errors.length > 0){
                console.log(errors)
                const scanner = {
                    scannerId: scannerId,
                    scannerNumber: scannerNumber
                }
                const model = {
                    errors: errors,
                    scanner
                }
                response.render('borrow-scanner.hbs', model)
            }else{
                response.redirect('/scanner')
            }
        })
    }),

    router.post('/return/:id', function(request, response){
        const scannerId = request.params.id
        scannerManager.returnScannerById(scannerId, function(errors){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    id: id
                }
                response.render('return-scanner.hbs', model)
            }else{
                response.redirect('/scanner')
            }
        })
    })

    return router
}



