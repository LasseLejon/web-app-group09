const awilix = require('awilix')

const container = awilix.createContainer()

container.register(
	'scannerRepository',
	awilix.asFunction(require('./data-access-layer/orm/scanner-repository.js'))
)
container.register(
	'scannerManager',
	awilix.asFunction(require('./business-logic-layer/scanner-manager.js'))
)
container.register(
	'scannerRouter',
	awilix.asFunction(require('./presentation-layer/routers/scanner-router.js'))
)
container.register(
	'accountRepository',
	awilix.asFunction(require('./data-access-layer/orm/account-repository.js'))
)
container.register(
	'authRepository',
	awilix.asFunction(require('./data-access-layer/orm/auth-repository.js'))
)
container.register(
	'accountManager',
	awilix.asFunction(require('./business-logic-layer/account-manager.js'))
)
container.register(
	'authManager',
	awilix.asFunction(require('./business-logic-layer/auth-manager.js'))
)
container.register(
	'accountRouter',
	awilix.asFunction(require('./presentation-layer/routers/account-router.js'))
)
container.register(
	'authRouter',
	awilix.asFunction(require('./presentation-layer/routers/auth-router.js'))
)


const authRouter = container.resolve('authRouter')
const scannerRouter = container.resolve('scannerRouter')
const accountRouter = container.resolve('accountRouter')


module.exports = {
	accountRouter,
	scannerRouter,
	authRouter,
} 