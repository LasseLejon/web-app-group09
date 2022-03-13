const awilix = require('awilix')

const container = awilix.createContainer()

container.register(
	'scannerRepository',
	awilix.asFunction(require('./data-access-layer/scanner-repository.js'))
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
	awilix.asFunction(require('./data-access-layer/account-repository.js'))
)
container.register(
	'authRepository',
	awilix.asFunction(require('./data-access-layer/auth-repository.js'))
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
container.register(
	'accountRouterRest',
	awilix.asFunction(require('./presentation-layer/rest-api/routers/account-router.js'))
)
container.register(
	'scannerRouterRest',
	awilix.asFunction(require('./presentation-layer/rest-api/routers/scanner-router.js'))
)
container.register(
	'startApps',
	awilix.asFunction(require('./presentation-layer/app.js'))
)
container.register(
	'restApp',
	awilix.asFunction(require('./presentation-layer/rest-api/rest-app.js'))
)
container.register(
	'webApp',
	awilix.asFunction(require('./presentation-layer/web-app.js'))
)
//const restApp = container.resolve('restApp')
const startApps = container.resolve('startApps')

const accountRouterRest = container.resolve('accountRouterRest')
const scannerRouterRest = container.resolve('scannerRouterRest')
const authRouter = container.resolve('authRouter')
const scannerRouter = container.resolve('scannerRouter')
const accountRouter = container.resolve('accountRouter')


module.exports = {
//	restApp,
	scannerRouterRest,
	accountRouterRest,
	accountRouter,
	scannerRouter,
	authRouter,
} 

startApps.start()