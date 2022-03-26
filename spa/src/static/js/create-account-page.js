function loadCreateAccountPage(){
    const errorUl = document.getElementById('create-account-error-ul')
    errorUl.innerText = ""
}

async function submitCreateAccountForm(){   
    const username = document.getElementById('create-account-username-input').value
    const password = document.getElementById('create-account-password-input').value
    const repeatPassword = document.getElementById('create-account-repeat-password-input').value
    const errorUl = document.getElementById('create-account-error-ul')
    errorUl.innerText = ""

    if(password == repeatPassword){
        const response = await fetch(API_URL + 'accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({username: username, password: password, shouldBeAdmin: 'yes'})
        })
        if(response.status == 400){
            const errors = await response.json()
            for(const error of errors){
                const li = document.createElement('li')
                li.innerText = error
                errorUl.appendChild(li)
            }           
        }
        else{
            hideCurrentPage()
            window.history.pushState(null, "", '/auth/login')
            showPage('/auth/login')
        }
    }
    else{
        const li = document.createElement('li')
        li.innerText = "passwordNotMatching"
        errorUl.appendChild(li)
    }
}