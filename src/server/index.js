const app = require('./app')

const port = process.env.PORT || 8000

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${port}!`)
})