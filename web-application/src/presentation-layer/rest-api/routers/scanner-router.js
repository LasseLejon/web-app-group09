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

    router.use(function(request, response, next){
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })

    router.get("/scanner", function(request, response){
        scannerManager.getAllScanners(function(errors, scanners){
            if(errors.length > 0){
                response.status(404).json(errors)
            }
            response.status(200).json(scanners)
        })
        
    })

    router.get('/scanner/update/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            if(errors.length > 0){
                response.status(404).json(errors)
            }
            console.log(scanner[0])
           // console.log(scanner)
            response.status(200).json(scanner)
        })
    })
    router.get('/scanner/delete/:id', function(request, response){
        const id = request.params.id
        scannerManager.getScannerById(id, function(errors, scanner){
            if(errors.length > 0){
                response.status(204).end()
            }
            else{
                response.status(204).end()
            }
        })
    })

    router.post('/scanner/create', function(request, response){
        const scannerId = request.body.scannerId
        const authorizationHeader = request.header("Authorization")
        const access_token = authorizationHeader.substring("Bearer ".length)
        const scanner = {
            scannerId: scannerId
        }
        jwt.verify(access_token,ACCESS_TOKEN_SECRET,function(error,payload){
            if(error){
                response.status(401).end()
            }
            if(payload.isAdmin != true){
                response.status(401).end()
            }
            if(payload.isAdmin == true){
                scannerManager.createScanner(scanner, function(errors, id){
                    if(errors.length > 0){
                        console.log("error",errors)
                        response.status(400).json(errors)
                    }else{
                        response.status(200).end()
                    }
                })

            }
        })
    
    })

    router.put('/scanner/update/:id', function(request, response){
        const newScannerId = request.body.scannerId
        const scannerId = request.params.id
        const authorizationHeader = request.header("Authorization")
        const access_token = authorizationHeader.substring("Bearer ".length)
        const scanner = {
            scannerId: scannerId,
            newScannerId: newScannerId
        }
        jwt.verify(access_token, ACCESS_TOKEN_SECRET, function(error,payload){
            if(error){
                response.status(401).end()
            }
            if(payload.isAdmin != true){
                response.status(401).end()
            }
            if(payload.isAdmin == true){
                scannerManager.updateScannerById(scanner, function(errors){
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

    router.delete('/scanner/delete/:id', function(request, response){
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
                scannerManager.deleteScannerById(scannerId, function(errors){
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