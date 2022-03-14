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
            break

        case '/account':
            nextPageId = 'account-page'
            break

        case '/scanner':
            nextPageId = 'scanner-page'
            break

        case '/history':
            nextPageId = 'history-page'
            break
    
        default:
            nextPageId = 'not-found-page'
            break
    }

    document.getElementById(nextPageId).classList.add('current-page')
}