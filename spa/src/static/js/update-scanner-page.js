async function loadUpdateScannerPage(id){
    const response = await fetch("http://localhost:3000/api/scanner/update/" + id)

    const scanner = await response.json()

    const inputElement = document.getElementById('update-scanner-input')

    inputElement.value = id

    document.addEventListener('submit', (event) =>{
        event.preventDefault()
        fetch("http://localhost:3000/api/scanner/update/" + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputElement.value)
        }).then(function(response){
            console.log('hello')
        }).catch(function(error){
            console.log(error)
        })
        
    })



    
}