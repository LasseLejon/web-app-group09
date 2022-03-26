async function submitLoginForm(){
    const username = document.getElementById('login-username-input').value
    const password = document.getElementById('login-password-input').value  
    const response = await fetch(API_URL + "tokens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({grant_type: 'password',username: username, password: password})
    })   
    const status = await response.json()
    ACCESS_TOKEN = status.access_token  
}
