async function loadDeleteScannerPage(){
 //   const a = document.getElementById('history-page')
    const deletescanner = document.getElementById('delete-scanner-page')
    const p = document.createElement('p')
    const button = getElementById('deletButton')
    const form = getElementById('deleteForm')
    button.innerText = "Yes delete"
    
    p.innerText = "Are you sure you want to delete this scanner?"
    deletescanner.appendChild(p)


    
}