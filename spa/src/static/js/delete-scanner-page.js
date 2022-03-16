async function loadDeleteScannerPage(id){
 //   const a = document.getElementById('history-page')
    const deletescanner = document.getElementById('delete-scanner-page')
    const p = document.createElement('p')
    p.innerText = "Are you sure you want to delete this scanner?"
    deletescanner.appendChild(p)
    
    const form = document.getElementById('deleteForm')

    const button = document.getElementById('deleteButton')
    button.innerText = "Yes delete"

    const form = document.getElementById('deleteForm')

    

    form.addEventListener('submit', (event) =>{
        event.preventDefault()
        fetch("http://localhost:3000/api/scanner/delete/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer '+ACCESS_TOKEN
            },
        //    body: JSON.stringify(inputElement.value)
        }).then(function(response){
            console.log('hello')
        }).catch(function(error){
            console.log(error)
        })
        
    })

    


  //  document.addEventListener('submit', function(){
   //    const response = await fetch("http://localhost:3000/api/scanner/delete/"+id)
   //    response.fetch()

  //  })
 
      

   
    
    


    
}