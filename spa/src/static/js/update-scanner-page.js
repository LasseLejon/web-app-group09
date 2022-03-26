async function loadUpdateScannerPage(id){
    const response = await fetch("http://localhost:3000/api/scanners/" + id)
    if(response.status == 404){
        hideCurrentPage()
        window.history.pushState(null, "", '/not-found')
        showPage('/not-found')  
    }
    else{
        const scanner = await response.json()
        const updateErrorUl = document.getElementById('update-error-ul')
        updateErrorUl.innerText = ""
        const inputElement = document.getElementById('update-scanner-input')  
        inputElement.value = scanner[0].scannerId       
    }
}

async function submitUpdateScannerForm(){
    const inputElement = document.getElementById('update-scanner-input')
    const inputValue = inputElement.value
    const [empty, scanner, update, id] = location.pathname.split('/')
    const updateErrorUl = document.getElementById('update-error-ul')
    updateErrorUl.innerText = ""
    const errors = getValidationErrorsUpdateScannerInput(inputValue)
    if(errors.length > 0){
        for(const error of errors){
            const li = document.createElement('li')
            li.innerText = error
            updateErrorUl.appendChild(li)
        }
    }
    else{    
        const response = await fetch(API_URL + "scanners/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ ACCESS_TOKEN
            },
            body: JSON.stringify({scannerId: inputValue})
        })
        console.log(response)
        if(response.status == 204){
            hideCurrentPage()
            window.history.pushState(null, "", '/scanner')
            showPage('/scanner')
        }
        else{
            const errors = await response.json()
            for(const error of errors){
                const li = document.createElement('li')
                li.innerText = error
                updateErrorUl.appendChild(li)    
            }
        }
    }
}

function getValidationErrorsUpdateScannerInput(input){
    const errors = []
    if(isNaN(input)){
        errors.push('invalidInput')
    }
    if(typeof ACCESS_TOKEN == 'undefined'){
        errors.push('notLoggedIn')
    }
    return errors
}