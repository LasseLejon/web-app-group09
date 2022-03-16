async function loadUpdateScannerPage(id){
    const response = await fetch("http://localhost:3000/api/scanner/update/" + id)
    const scanner = await response.json()
    //errorhandling
    const inputElement = document.getElementById('update-scanner-input')

    inputElement.value = scanner[0].scannerId 
}

async function submitUpdateScannerForm(){
    const inputElement = document.getElementById('update-scanner-input')
    const inputValue = inputElement.value
    const [empty, scanner, update, id] = location.pathname.split('/')
    console.log(typeof(inputValue))
        const response = await fetch(API_URL + "scanner/update/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ ACCESS_TOKEN,
                'Accept': 'application/json'
            },
            body: JSON.stringify({scannerId: inputValue})
        })
        //const data = await response.json()
        

        //console.log(data)
}