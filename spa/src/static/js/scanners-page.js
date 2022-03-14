async function loadScannersPage(){
	
	const response = await fetch("http://localhost:3000/api/scanner")
	
	// TODO: Check status code and act accordingly!
	
	const scanners = await response.json()

    console.log("hej",scanners)
	
	const allScannersUl = document.getElementById('all-scanners')
	allScannersUl.innerText = ""
	
	for(const scanner of scanners){
		
		const li = document.createElement('li')
		li.innerText = "scanner: "+ scanner.scannerId
        console.log(scanner.scannerId)
		
	//	const anchor = document.createElement('a')
	//	anchor.innerText = human.name
	//	anchor.setAttribute('href', "/humans/"+human.id)
		
		//li.appendChild(anchor)
		
		allScannersUl.appendChild(li)
        console.log(allScannersUl)
		
	}
	
}