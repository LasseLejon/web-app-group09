async function loadDeleteScannerPage(id){
 //   const a = document.getElementById('history-page')
    const deletescanner = document.getElementById('delete-scanner-page')
    const p = document.createElement('p')
    p.innerText = "Are you sure you want to delete this scanner?"
    deletescanner.appendChild(p)
    const button = document.getElementById('deleteButton')
    button.innerText = "Yes delete"

    const form = document.getElementById('deleteForm')

  //  document.addEventListener('submit', function(){
   //    const response = await fetch("http://localhost:3000/api/scanner/delete/"+id)
   //    response.fetch()

  //  })
 
      

   
    
    


    
}