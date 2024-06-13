const dotev = require('dotenv');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

dotev.config();

const  db = knex({
    client: 'pg',
    connection: {
        // host: '127.0.0.1',
        // user: 'postgres',
        // password: '074624750a',
        // database: 'loginform'
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        database: process.env.DB_DATABASE
    }
})

const app = express();

let initialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, "login.html"));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, "register.html"));
})
app.post('/register-user',(req, res) => {
    const { username, email, password} = req.body;

    if(!username.length || !email.length || !password.length){
        res.json('Fill all the fields');
    } else{
        db('users').insert({
            username: username,
            email: email,
            password: password
        })
        .returning(["username", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            // console.log(err);
            if(err.detail.includes('existiert bereits') || err.detail.includes('already exists')){
                res.json('Email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) =>{
    const { email, password } = req.body;

    db.select('username', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000.....");
})