async function loadUpdateScannerPage(id){
    const response = await fetch("http://localhost:3000/api/scanner/update/" + id)
    console.log(ACCESS_TOKEN)
    const scanner = await response.json()

    const inputElement = document.getElementById('update-scanner-input')

    console.log(scanner)

    inputElement.value = scanner[0].scannerId

    updateForm = document.getElementById('update-scanner-form')

    updateForm.addEventListener('submit', async function(event){

        event.preventDefault()
        const response = await fetch(API_URL + "scanner/update/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({access_token: ACCESS_TOKEN, scannerId: inputElement.value})
        })
        const data = await response.json()
        console.log(data)

    })    
}