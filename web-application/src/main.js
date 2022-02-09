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
	'accountManager',
	awilix.asFunction(require('./business-logic-layer/account-manager.js'))
)
container.register(
	'accountRouter',
	awilix.asFunction(require('./presentation-layer/routers/account-router.js'))
)

const scannerRouter = container.resolve('scannerRouter')
const accountRouter = container.resolve('accountRouter')

module.exports = {
	accountRouter,
	scannerRouter
} 