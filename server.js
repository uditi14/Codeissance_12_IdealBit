const { Template } = require('ejs')
const express = require('express')
const app = express()
const port = 3000
const users = [{name:"Temp",email:"t@t",password:"t"}]
const passport = require('passport')
const initializePassport = require('./passport-config')
let tempName = ""

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/', (req, res) => res.render('index.ejs',{name:tempName}))
app.get('/login', (req,res) => res.render('login.ejs'))
app.get('/register', (req,res) => res.render('register.ejs'))

app.post('/register', (req,res) => {
    users.push({
        id: Date.now().toString(),
        name:req.body.name,
        email:req.body.email,
        password: req.body.password
    })

    console.log(users.length)
    res.redirect('/login')
}) 
app.post('/login', (req,res) => {
    users.forEach(user=> {
        console.log("hh");
        if (user.email === req.body.email) {
            if (req.body.password == user.password) {
                // console.log(user.p)
                tempName = user.name
                res.redirect('/')
            }
            else{
                console.log("incorrect password");
                return
            }
        }
    })
    console.log('user not found')
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))