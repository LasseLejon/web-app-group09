async function loadDeleteScannerPage(id){
    const ul = document.getElementById('delete-error-ul')
    ul.innerText = ""
}

async function submitDeleteScannerForm(){
    
    const [empty, scanner, update, id] = location.pathname.split('/')
    
  //  const form = document.getElementById('deleteForm')
    const button = document.getElementById('deleteButton')
    button.innerText = "Yes delete"
    const ul = document.getElementById('delete-error-ul')
    ul.innerText = ""
    console.log("hejhej")
    var error = ""
    if(typeof ACCESS_TOKEN == 'undefined'){
        error = 'unauthorized'
        const li = document.createElement('li')
            li.innerText = error
            ul.appendChild(li)    
    }
    else{
        const response = await fetch("http://localhost:3000/api/scanner/delete/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer '+ACCESS_TOKEN,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'

            },
        //    body: JSON.stringify(response.status)
        
        
    
        })
        console.log(response)

        if(response.status == 204){
            console.log("apa")
            hideCurrentPage()
            window.history.pushState(null, "", '/scanner')
            showPage('/scanner')
        }
        else{
            console.log("aagjjgjg")
         //   ul.innerText = ""
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