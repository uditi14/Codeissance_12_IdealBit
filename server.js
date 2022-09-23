if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const {MongoClient} = require('mongodb')

async function main() {
  const uri = "mongodb+srv://hackathon_website:password_db@cluster0.vs1uu3w.mongodb.net/?retryWrites=true&w=majority"

  const client = new MongoClient(uri)

  try {
    await client.connect()
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.error)

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []
let name =""
let user

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    name = req.body.password
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
  
    res.redirect('/details')
  } catch {
    res.redirect('/register')
  }
})

app.get('/details', checkNotAuthenticated,(req,res)=> {
  res.render('details.ejs',{name:name})
})

app.post('/details', (req,res) => {
  users[users.length-1] = {
    ...users[users.length-1],
    fullname: req.body.fullname,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    targetWeight: req.body.targetWeight,
    gender: req.body.gender.value,
    bmi: req.body.BMI
  }

  console.log(users[users.length-1])
  res.redirect('/login')
})



app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)


app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/css',express.static(__dirname+'public/js'))