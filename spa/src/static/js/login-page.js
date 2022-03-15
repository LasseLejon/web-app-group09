/* function loadLoginPage(){
    document.addEventListener('submit', function(event){
        event.preventDefault()
        const username = document.getElementById('login-username-input').value
        const password = document.getElementById('login-password-input').value
        
         fetch("http://localhost:3000/api/tokens", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({grant_type: 'password',username: username, password: password})
        }).then(function(response){
            console.log(response.json())
        }).catch(function(error){
            console.log(error)
        })
    })
} */

async function loadLoginPage(){
    document.addEventListener('submit', async function(event){
        event.preventDefault()
        const username = document.getElementById('login-username-input').value
        const password = document.getElementById('login-password-input').value
        
         const response = await fetch("http://localhost:3000/api/tokens", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({grant_type: 'password',username: username, password: password})
        })

        const status = await response.json()
        console.log(status.access_token)

    })
} 