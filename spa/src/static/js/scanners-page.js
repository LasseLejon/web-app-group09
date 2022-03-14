async function loadScannersPage(){
	
	const response = await fetch("http://localhost:3000/api/scanner")
	
	// TODO: Check status code and act accordingly!
	
	const scanners = await response.json()
	
	const allScannersTable = document.getElementById('all-scanners')
	allScannersTable.innerText = ""

	
	for(const scanner of scanners){
		const tr = document.createElement('tr')
		const tdId = document.createElement('td')
		const tdInUse = document.createElement('td')
		const tdUpdate = document.createElement('td')
		const tdDelete = document.createElement('td')

		const anchorUpdate = document.createElement('a')
		const anchorDelete = document.createElement('a')

		anchorUpdate.href = "scanner/update/" + scanner.scannerId
		anchorUpdate.innerText = "Update"

		anchorDelete.href = "scanner/delete/" + scanner.scannerId
		anchorDelete.innerText = "Delete"

		tdId.innerText = scanner.scannerId
		tdInUse.innerText = scanner.scannerInUse

		tdUpdate.appendChild(anchorUpdate)
		tdDelete.appendChild(anchorDelete)


		tr.appendChild(tdId)
		tr.appendChild(tdInUse)
		tr.appendChild(tdUpdate)
		tr.appendChild(tdDelete)
		allScannersTable.appendChild(tr)	
	}
	
}