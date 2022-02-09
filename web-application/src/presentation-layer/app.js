const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser');
//const accountRouter = require('./routers/account-router')
const variousRouter = require('./routers/various-router')
const routers = require('./main')

const scannerRouter = routers.scannerRouter
const accountRouter = routers.accountRouter

const app = express()

app.use(bodyParser.urlencoded({extended:false}));


app.use(express.urlencoded({
	extended: false
}))

app.set('views', path.join(__dirname, "views"))

app.engine('hbs', expressHandlebars.engine({
  extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))


app.use('/', variousRouter)
app.use('/account', accountRouter)
app.use('/scanner', scannerRouter)


app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})