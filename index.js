const express = require('express');
const app = express();
// const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

// const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/bookRoute')

mongoose.connect('mongodb+srv://blogs:blogs@cluster0.50fccre.mongodb.net/').then(() => {
    console.log('Mongodb Connected')
}).catch((err) => console.log(err))

function middleware(req, res, next) {
    console.log('Middleware console')
    next()
}
// app.use(morgan('tiny'))
app.use(middleware)
app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ['Content-Type'],
  }))


app.get('/', (req, res) => {
    res.send({
        status: 200,
        msg: "API is working fine with nodemon"
    })
})

app.get('/about', (req, res) => {
    res.send({
        status: 200,
        msg: "About Route"
    })
})


// app.use('/user', userRoutes)
app.use('/books', bookRoutes)

const port = 3000

//Server Production assets
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("frontend/build")))
    app.get("*", (req, res) => res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html')))
}

app.listen(port, () => {
    console.log('Server listening on port ' + port);
}); 