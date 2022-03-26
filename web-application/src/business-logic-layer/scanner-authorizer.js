exports.getAuthorizationErrorsGetScannerBorrowDetails = function(account){
    const errors = []
    
    if(!account.isAdmin){
        errors.push('notAdmin')
    }
    return errors
}