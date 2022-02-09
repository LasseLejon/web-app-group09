const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const variousRouter = require('./routers/various-router')

// const scannerRouter = require('./routers/scanner-router')
//const authRouter = require('./routers/auth-router')
const session = require('express-session')
const RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
const redisClient = createClient({ legacyMode: true, url: 'redis://redis:6379' })
redisClient.connect().catch(console.error)

const routers = require('../main.js')
const authRouter = routers.authRouter
const scannerRouter = routers.scannerRouter
const accountRouter = routers.accountRouter


const app = express()

app.use(bodyParser.urlencoded({extended:false}));


app.use(express.urlencoded({
	extended: false
}))

app.use(
	session({
	  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
	  saveUninitialized: false,
	  secret: "keyboard cat12345",
	  resave: false,
	})
  )

  app.use(function(request, response, next){
	response.locals.session = request.session
	next()
})

app.set('views', path.join(__dirname, "views"))

app.engine('hbs', expressHandlebars.engine({
  extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))


app.use('/', variousRouter)
app.use('/account', accountRouter)
app.use('/scanner', scannerRouter)
app.use('/login', authRouter)


app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})