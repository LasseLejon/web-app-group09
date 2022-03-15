const express = require('express')

const app = express()

app.use(express.static('/spa/src/static'))

app.get("*", function(request, response){


	response.sendFile("/spa/src/static/index.html")

})

app.listen(4000)