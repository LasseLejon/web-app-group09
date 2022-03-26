const express = require('express')

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
    })

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
        const isAdmin = request.session.isAdmin
        const requestData = {
            scannerId: scannerId,
            isAdmin: isAdmin
        }

        scannerManager.createScanner(requestData, function(errors, id){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    id: id
                }
                response.render('create-scanner.hbs', model)
            }
            else{
                response.redirect('/scanner')
            }
        })
    })

    router.post('/update/:id', function(request, response){
        const newScannerId = request.body.scannerId
        const scannerId = request.params.id
        const isAdmin = request.session.isAdmin
        const requestData = {
            scannerId: scannerId,
            newScannerId: newScannerId,
            isAdmin: isAdmin
        }

        scannerManager.updateScannerById(requestData, function(errors){
            if(errors.length > 0){
                const scanner = {
                    scannerId: scannerId
                }
                const model = {
                    errors: errors,
                    scanner: scanner
                }
                response.render('update-scanner.hbs', model)
            }
            else{
                response.redirect('/scanner')
            }           
        })
    })
    router.post('/delete/:id', function(request, response){
        const scannerId = request.params.id
        const isAdmin = request.session.isAdmin
        const requestData = {
            scannerId: scannerId,
            isAdmin: isAdmin
        }

        scannerManager.deleteScannerById(requestData, function(errors){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    scanner: {
                        scannerId: scannerId
                    }
                }
                response.render('delete-scanner.hbs', model)
            }
            else{
                response.redirect('/scanner')
            }
        })
    })

    router.post('/borrow/:id', function(request, response){
        const scannerId = request.params.id
        const accountId = request.session.accountId
        const isLoggedIn = request.session.isLoggedIn
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const scannerBorrowDetails = {
            scannerId: scannerId,
            accountId: accountId,
            isLoggedIn: isLoggedIn,
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
            }
            else{
                response.redirect('/scanner')
            }
        })
    })

    router.post('/return/:id', function(request, response){
        const scannerId = request.params.id
        const accountId = request.session.accountId
        const isLoggedIn = request.session.isLoggedIn
        const scannerReturnDetails = {
            scannerId: scannerId,
            accountId: accountId,
            isLoggedIn: isLoggedIn,
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
            }
            else{
                response.redirect('/scanner')
            }
        })
    })

    router.get('/history', function(request, response){
        const isAdmin = request.session.isAdmin
        const account = {
            isAdmin: isAdmin
        }
        scannerManager.getScannerBorrowSessionDetails(account, function(errors, scannerBorrowSessionDetails){
                const model = {
                    errors: errors,
                    scannerBorrowSessionDetails: scannerBorrowSessionDetails
                }
            response.render('scanner-history.hbs', model)
        })
    })

    return router
}



