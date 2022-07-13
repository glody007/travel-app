const app = require('./app')

const port = 9000

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
    console.log(`App listening on port ${port}!`)
})