async function loadCreateScannerPage(){
    const form = document.getElementById('createScannerForm')

    form.addEventListener('submit',async function(event){
        event.preventDefault()

        const inputValue = document.getElementById('create-scanner-input').value
        console.log("twicesss")
        console.log("input", inputValue)
        
        const response = await fetch("http://localhost:3000/api/scanner/create", {
           method: 'POST',
           headers: {
               'Authorization': 'Bearer '+ACCESS_TOKEN,
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
           body: JSON.stringify({scannerId : inputValue})
       })

        const data = await response.json()
    //   ACCESS_TOKEN = status.access_token

   })

    








}