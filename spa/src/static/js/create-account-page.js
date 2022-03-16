function loadCreateAccountPage(){
    const createAccountForm = document.getElementById('create-account-form')
    createAccountForm.addEventListener('submit', async function(event){
        event.preventDefault()
        const username = document.getElementById('create-account-username-input').value
        const password = document.getElementById('create-account-password-input').value
        const repeatPassword = document.getElementById('create-account-repeat-password-input').value
        if(password == repeatPassword){
            const response = await fetch(API_URL + 'create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({username: username, password: password, admin: 'no'})
            }) 
            const data = await response.json()
            console.log(data)
        }
        else{
            console.log('not matching')
        }
    })
}