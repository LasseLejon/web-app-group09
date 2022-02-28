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
        const scannerId = request.params.id

         scannerManager.getScannerById(scannerId, function(errors, scanner){
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

    router.get('/active', function(request, response){
        const accountId = request.session.accountId
        console.log(accountId)
        scannerManager.getActiveScannerByAccountId(accountId, function(errors, activeScanner){
            const model = {
                errors: errors,
                activeScanner: activeScanner[0]
            }
            response.render('active-scanner.hbs', model)
        })
    })

    router.post('/create', function(request, response){
        const scannerId = request.body.scannerId
        const scanner = {
            scannerId: scannerId
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
        const newScannerId = request.body.scannerId
        const scannerId = request.params.id
        const scanner = {
            scannerId: scannerId,
            newScannerId: newScannerId
        }
        scannerManager.updateScannerById(scanner, function(errors){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    scanner: scanner
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
                    errors: errors
                }
                response.render('delete-scanner.hbs', model)
            }else{
                response.redirect('/scanner')
            }
        })
    })

    router.post('/borrow/:id', function(request, response){
        const scannerId = request.params.id
        const accountId = request.session.accountId
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const scannerBorrowDetails = {
            scannerId: scannerId,
            accountId: accountId,
            date: date

        }
        scannerManager.borrowScannerById(scannerBorrowDetails, function(errors){
            if(errors.length > 0){
                const scanner = {
                    scannerId: scannerId
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
        const accountId = request.session.accountId
        const scannerReturnDetails = {
            scannerId: scannerId,
            accountId: accountId,
            returnDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        scannerManager.returnScannerByScannerId(scannerReturnDetails, function(errors){
            if(errors.length > 0){
                const scanner = {
                    scannerId: scannerReturnDetails.scannerId
                }
                const model = {
                    errors: errors,
                    scanner
                }
                response.render('return-scanner.hbs', model)
            }else{
                response.redirect('/scanner')
            }
        })
    }),

    router.get('/history', function(request, response){
        scannerManager.getScannerBorrowSessionDetails(function(errors, scannerBorrowSessionDetails){
                const model = {
                    errors: errors,
                    scannerBorrowSessionDetails: scannerBorrowSessionDetails
                }

            response.render('scanner-history.hbs', model)
        })
    })

    return router
}



