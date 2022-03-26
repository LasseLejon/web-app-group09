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
    if(response.status == 200){
        hideCurrentPage()
            window.history.pushState(null, "", '/scanner')
            showPage('/scanner')
            const token = await response.json()
            ACCESS_TOKEN = token.access_token 
    }
    else{
        const ulErrors = document.getElementById('login-error-ul')
        ulErrors.innerText = ""
        const errors = await response.json()

        for(const error of errors){
            const li = document.createElement('li')
            li.innerText = error
            ulErrors.appendChild(li)
        }        
    }   
}
