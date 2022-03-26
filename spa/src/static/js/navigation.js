//A Global var containing the access_token
var ACCESS_TOKEN
const API_URL = "http://localhost:3000/api/"

document.addEventListener('DOMContentLoaded', function(){
    const anchors = document.querySelectorAll('a')

    for(const anchor of anchors){
        anchor.addEventListener('click', function(event){
            event.preventDefault()
            const url = anchor.getAttribute('href')
            history.pushState(null, "", url)
            hideCurrentPage()
            showPage(url)
        })
    }

    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit', (event) =>{
        event.preventDefault()
        submitLoginForm()
    })

    const createAccountForm = document.getElementById('create-account-form')
    createAccountForm.addEventListener('submit', (event) => {
        event.preventDefault()
        submitCreateAccountForm()
    })

    const updateScannerForm = document.getElementById('update-scanner-form')
    updateScannerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        submitUpdateScannerForm()
    })

    const deleteScannerForm = document.getElementById('delete-scanner-form')
    deleteScannerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        submitDeleteScannerForm()
    })

    const createScannerForm = document.getElementById('createScannerForm')
    createScannerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        submitCreateScannerForm()
    })
    showPage(location.pathname)
})

window.addEventListener('popstate', function(){
    hideCurrentPage()
    showPage(location.pathname)
})

function hideCurrentPage(){
    document.querySelector('.current-page').classList.remove('current-page')
}

function showPage(url){
    let nextPageId

    switch (url) {
        case '/':
            nextPageId = 'home-page'
            break

        case '/auth/login':
            nextPageId = 'login-page'
            break

        case '/scanner':
            nextPageId = 'scanner-page'
            loadScannersPage()
            break

        case '/account/create':
            nextPageId = 'create-account-page'
            loadCreateAccountPage()
            break
    
        default:
            if(url.startsWith('/scanner/update/')){
                const [empty, scanner, update, id] = url.split('/')
                nextPageId = 'update-scanner-page'
                loadUpdateScannerPage(id)
            }
            else if(url.startsWith("/scanner/delete/")){
                const [empty, scanner, update, id] = url.split('/')
                nextPageId = 'delete-scanner-page'
                loadDeleteScannerPage(id)
            }
            else if(url.startsWith("/scanner/create")){
                const parts = url.split('/')
                nextPageId = 'create-scanner-page'
                loadCreateScannerPage()
            }
            else{
                nextPageId = 'not-found-page'
            }           
    }

    document.getElementById(nextPageId).classList.add('current-page')
}