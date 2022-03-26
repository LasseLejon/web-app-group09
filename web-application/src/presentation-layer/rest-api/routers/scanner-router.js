const ACCESS_TOKEN_SECRET = "adksfjdsfdsfsdf"

module.exports = function({scannerManager}){
    const express = require('express')
    const bodyParser = require('body-parser')
    const jwt = require('jsonwebtoken')
    const router = express.Router() 

    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({
        extended: false
    }))

    router.get("/scanners", function(request, response){
        scannerManager.getAllScanners(function(errors, scanners){
            if(errors.length > 0){
                response.status(404).json(errors)
            }
            else{
                response.status(200).json(scanners)
            }
        })
        
    })

    router.get('/scanners/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            
            if(errors.length > 0){
                response.status(404).json(errors)
            }
            else{
                response.status(200).json(scanner)
            }           
        })
    })

    router.post('/scanners', function(request, response){
        const scannerId = request.body.scannerId
        const authorizationHeader = request.header("Authorization")
        const access_token = authorizationHeader.substring("Bearer ".length)
        const scanner = {
            scannerId: scannerId,
            isLoggedIn: true
        }
        jwt.verify(access_token,ACCESS_TOKEN_SECRET,function(error,payload){
            if(error){
                response.status(401).end()
            }
            if(payload.isAdmin != true){
                response.status(401).end()
            }
            if(payload.isAdmin == true){
                const requestData = {
                    scannerId: scannerId,
                    isAdmin: true
                }
                scannerManager.createScanner(requestData, function(errors, id){
                    if(errors.length > 0){
                        response.status(400).json(errors)
                    }
                    else{
                        response.status(201).end()
                    }
                })
            }
        })    
    })

    router.put('/scanners/:id', function(request, response){
        const newScannerId = request.body.scannerId
        const scannerId = request.params.id
        const authorizationHeader = request.header("Authorization")
        const access_token = authorizationHeader.substring("Bearer ".length)
        jwt.verify(access_token, ACCESS_TOKEN_SECRET, function(error,payload){
            if(error){
                response.status(401).end()
            }
            if(payload.isAdmin != true){
                response.status(401).end()
            }
            if(payload.isAdmin == true){
                const requestData = {
                    scannerId : scannerId,
                    newScannerId : newScannerId,
                    isAdmin : true
                }
                scannerManager.updateScannerById(requestData, function(errors){
                    if(errors.length > 0){
                       
                        response.status(400).json(errors)
                    }
                    else{
                        response.status(204).end()
                    }                   
                })
            }
        })    
    })

    router.delete('/scanners/:id', function(request, response){
        const scannerId = request.params.id
        const authorizationHeader = request.header("Authorization")
        const access_token = authorizationHeader.substring("Bearer ".length)

        jwt.verify(access_token, ACCESS_TOKEN_SECRET, function(error,payload){
            if(error){
                response.status(401).end()
            }
            if(payload.isAdmin != true){
                response.status(401).end()
            }
            if(payload.isAdmin == true){
                const requestData = {
                    scannerId: scannerId,
                    isAdmin: true
                }
                scannerManager.deleteScannerById(requestData, function(errors){
                    if(errors.length > 0){
                        response.status(404).json(errors)
                    }           
                    else{
                        response.status(204).end()
                    }
                })
            }
        })
    })

    return router

}