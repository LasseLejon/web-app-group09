async function loadCreateScannerPage(){
//    const response = await fetch("http://localhost:3000/api/scanner/create")
//    const scanner = await response.json()
    const ul = document.getElementById('create-error-ul')
    ul.innerText = ""
   
}
async function submitCreateScannerForm(){
    const form = document.getElementById('createScannerForm')
    const ul = document.getElementById('create-error-ul')
    ul.innerText = ""

    

        const inputValue = document.getElementById('create-scanner-input').value
        console.log("twicesss")
        console.log("input", inputValue)
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
            console.log(response)
            if(response.status == 200){
                hideCurrentPage()
                window.history.pushState(null, "", '/scanner')
                showPage('/scanner')
            }
            else{
                ul.innerText = ""
                const li = document.createElement('li')
                li.innerText = response.statusText
                ul.appendChild(li)    
                
            }
        }
    //    const data = await response.json()
    //    console.log("data",data)
    //   ACCESS_TOKEN = status.access_token



}

function getValidationErrorsCreateScannerInput(input){
    const errors = []
    if(isNaN(input)){
        errors.push('invalidInput')
    }
    if(typeof ACCESS_TOKEN == 'undefined'){
        errors.push('unauthorized')
    }
    return errors
}
