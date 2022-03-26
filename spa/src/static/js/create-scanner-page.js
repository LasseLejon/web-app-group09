async function loadCreateScannerPage(){
    const ul = document.getElementById('create-error-ul')
    ul.innerText = ""
    const scannerIdInput = document.getElementById('create-scanner-input')
    scannerIdInput.value = ""
}

async function submitCreateScannerForm(){
    const form = document.getElementById('createScannerForm')
    const ul = document.getElementById('create-error-ul')
    ul.innerText = ""
    const inputValue = document.getElementById('create-scanner-input').value
    const errors = getValidationErrorsCreateScannerInput(inputValue)

    if(errors.length > 0){
        for(const error of errors){
            const li = document.createElement('li')
            li.innerText = error
            ul.appendChild(li)
        }
    }
    else{
        const response = await fetch("http://localhost:3000/api/scanners", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ACCESS_TOKEN,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({scannerId : inputValue})   
        })
        if(response.status == 201){
            hideCurrentPage()
            window.history.pushState(null, "", '/scanner')
            showPage('/scanner')
        }
        if(response.status == 400){
            ul.innerText = ""
            const errors = await response.json()
            for(const error of errors){
                console.log(error)
                const li = document.createElement('li')
                li.innerText = error
                ul.appendChild(li)    
            } 
        }
        else{
                         
        }
    }   
}

function getValidationErrorsCreateScannerInput(input){
    const errors = []

    if(isNaN(input)){
        errors.push('invalidInput')
    }
    if(!ACCESS_TOKEN){
        errors.push('unauthorized')
    }
    return errors
}
