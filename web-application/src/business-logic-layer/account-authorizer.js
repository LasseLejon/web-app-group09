exports.getAuthorizationErrorsUpdateAccount = function(errors, account){
    if(!account.isAdmin){
        if(account.accountId != account.loggedInAccount){
            errors.push('accountsNotMatching')
        }
    }
}

exports.getAuthorizationErrorsDeleteAccount = function(account){
    const errors = []
    if(!account.isAdmin){
        if(account.accountId != account.loggedInAccount){
            errors.push('accountsNotMatching')
        }
    }
    return errors
}