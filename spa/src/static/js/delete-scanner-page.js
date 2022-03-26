async function loadDeleteScannerPage(id){
    const ul = document.getElementById('delete-error-ul')
    ul.innerText = ""
    const p = document.getElementById('delete-scanner-p')
    p.innerText = ""
    console.log(API_URL + 'scanners/' + id)
    const response = await fetch(API_URL + 'scanners/' + id)
    console.log(response.status)

    if(response.status == 404){
        hideCurrentPage()
        window.history.pushState(null, "", '/not-found')
        showPage('/not-found')
    }
    else{
        const scanner = await response.json()
        console.log(scanner[0].scannerId)
        p.innerText = 'Are you sure you want to delete scanner with id ' + scanner[0].scannerId +'?'
    }   
}

async function submitDeleteScannerForm(){   
    const [empty, scanner, update, id] = location.pathname.split('/')  
    const button = document.getElementById('deleteButton')
    button.innerText = "Yes delete"
    const ul = document.getElementById('delete-error-ul')
    ul.innerText = ""
    var error = ""

    if(typeof ACCESS_TOKEN == 'undefined'){
        error = 'unauthorized'
        const li = document.createElement('li')
        li.innerText = error
        ul.appendChild(li)    
    }
    else{
        const response = await fetch("http://localhost:3000/api/scanners/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer '+ACCESS_TOKEN,
            }    
        })
        if(response.status == 204){
            hideCurrentPage()
            window.history.pushState(null, "", '/scanner')
            showPage('/scanner')
        }
        else{
            const li = document.createElement('li')
            li.innerText = response.statusText
            ul.appendChild(li)         
        }        
    }    
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