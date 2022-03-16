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
            loadLoginPage(ACCESS_TOKEN)
            break

        case '/account':
            nextPageId = 'account-page'
            break

        case '/scanner':
            nextPageId = 'scanner-page'
            console.log(ACCESS_TOKEN)
            loadScannersPage()
            break

        case '/history':
            nextPageId = 'history-page'
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
                loadDeleteScannerPage(id, ACCESS_TOKEN)
            }
            else{
                nextPageId = 'not-found-page'
            }
            
    }

    document.getElementById(nextPageId).classList.add('current-page')
}