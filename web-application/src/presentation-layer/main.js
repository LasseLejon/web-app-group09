const awilix = require('awilix')

const container = awilix.createContainer()

container.register(
	'scannerRepository',
	awilix.asFunction(require('../data-access-layer/scanner-repository.js'))
)
container.register(
	'scannerManager',
	awilix.asFunction(require('../business-logic-layer/scanner-manager.js'))
)
container.register(
	'scannerRouter',
	awilix.asFunction(require('./routers/scanner-router.js'))
)

const scannerRouter = container.resolve('scannerRouter')

module.exports = scannerRouter