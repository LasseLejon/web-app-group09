async function loadScannersPage(){
	
	const response = await fetch("http://localhost:3000/api/scanner")
	
	// TODO: Check status code and act accordingly!
	
	const scanners = await response.json()
	
	const allScannersUl = document.getElementById('all-scanners')
	allScannersUl.innerText = ""

    console.log(scanners)
	
	for(const scanner of scanners){
        console.log(scanner.scannerId)

		
		
		const li = document.createElement('li')
		li.innerText = scanner.scannerId
		
		
		allScannersUl.appendChild(li)
		
	}
	
}