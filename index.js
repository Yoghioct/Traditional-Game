const express = require('express')
const app = express()
const users = require('./db/users.json')

// middleware
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));


// static open public foder
app.use(express.static('public'));

// ejs compatibility
app.set('view engine', 'ejs')

// render index.js
app.get('/', (req, res) => {
    res.render('index')
})

// erorr render 
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        erorr: err.message
    });
});

// import router
const router = require('./route/index');
app.use(router);

// api get all users
app.get('/api/v1/users', (req, res) => {
res.status(200).send(users)
    // res.status(200).json(users)
})

// api spesific users
app.get('/api/v1/users/:id', (req, res) => {
    const user = users.find(i => i.id == req.params.id)
    res.status(200).send(user)
})

// api delete
app.delete('/api/v1/users/:id'), (req, res) => {
    users = users.filter((i) => {
        return users.id != req.params.id
    })

    res.status(200).json({
        message: 'User Berhasil Diihapus'
    })
}

// api post
app.post('/api/v1/users', (req, res) => {
    const {email, username, password} = req.body

    const id = users[users.length - 1].id + 1
    const post = {id, email, username, password}

    users.push(post)

    res.status(201).send(post)
})

// api put
app.put('/api/v1/user/:id', (req, res) => {
    let user = users.filter(i => i.id == req.params.id)

    const params = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    users = {
        ...users,
        ...params
    }
})

//login 
app.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body
    for (var i = 0; i < users.length; i++) {
        if (email == users[i].email && password == users[i].password) {
            res.redirect(`/games`) 
            }        
        }              
         res.render('login',{
            status: 'fail',            
        });
});

//sign up
app.post('/signup', (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
})


app.listen(3000, () => {
    console.log('server is running')
})

