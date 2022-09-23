if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')

async function createUser(newUser) {
  const uri = "mongodb+srv://hackathon_website:password_db@cluster0.vs1uu3w.mongodb.net/?retryWrites=true&w=majority"

  const client = new MongoClient(uri)

  try {
    await client.connect()

    await addUser(client, newUser)
    // await findUser(client,"hgg")
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

async function findUser(email) {
  const uri = "mongodb+srv://hackathon_website:password_db@cluster0.vs1uu3w.mongodb.net/?retryWrites=true&w=majority"

  const client = new MongoClient(uri)

  try {
    await client.connect()

    // await addUser(client, newUser) 
    await find(client,email)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

async function find(client, email) {
  const result = await client.db("userData").collection("users").findOne({email: email})
  user = result

  if (result) {
      console.log(`found user with username ${result.fullname}`);
      console.log(result);
  }
  else {
      console.log("no user found");
  }
}

async function addUser(client, newUser) {
  const result = await client.db("userData").collection("users").insertOne(newUser)

  console.log(`New user created with id: ${result.insertedId}`)
}

async function listDatabases(client) {
  const dataBasesList = await client.db().admin().listDatabases()
  dataBasesList.databases.forEach(db => {
    console.log(`-${db.name}`)
  });
}

let name =""
let user

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.post('/login', (req,res) =>{
  // findUser(req.body.email)
  // if (user === null) {
  //   res.redirect('/login')

  // }
  // else if (user.password === req.body.password) {
    res.redirect('/')
  // }
  // else {
  //   res.redirect('/login')
  // }
  
})

// app.set('view-engine', 'ejs')

app.get('/register',(req, res) => {
  res.render('register.ejs')
})

app.post('/register',async (req, res) => {
  // try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    name = req.body.password
    user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password 
    }
    
  
    res.redirect('/details')
  // } catch {
    // res.redirect('/register')
  // }
})

app.get('/details', (req,res)=> {
  res.render('details.ejs',{name:name})
})

app.post('/details', (req,res) => {
  user = {
    ...user,
    fullname: req.body.fullname,
    age: Number(req.body.age),
    weight: Number(req.body.weight),
    height: Number(req.body.height),
    targetWeight: Number(req.body.targetWeight),
    gender: req.body.gender.value,
    bmi: Number(req.body.BMI)
  }

  createUser(user).catch(console.error)

  console.log(user)
  res.redirect('/login')
})



// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })



app.listen(3000)


app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/css',express.static(__dirname+'public/js'))



// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// const express = require('express')
// const app = express()
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
// const methodOverride = require('method-override')
// const {MongoClient} = require('mongodb')

// async function createUser(newUser) {
//   const uri = "mongodb+srv://hackathon_website:password_db@cluster0.vs1uu3w.mongodb.net/?retryWrites=true&w=majority"

//   const client = new MongoClient(uri)

//   try {
//     await client.connect()

//     await addUser(client, newUser)
//     // await findUser(client,"hgg")
//   } catch (e) {
//     console.error(e)
//   } finally {
//     await client.close()
//   }
// }

// async function findUser() {
//   const uri = "mongodb+srv://hackathon_website:password_db@cluster0.vs1uu3w.mongodb.net/?retryWrites=true&w=majority"

//   const client = new MongoClient(uri)

//   try {
//     await client.connect()

//     // await addUser(client, newUser) 
//     await find(client,"hgg")
//   } catch (e) {
//     console.error(e)
//   } finally {
//     await client.close()
//   }
// }

// async function find(client, email) {
//   const result = await client.db("userData").collection("users").findOne({email: email})

//   if (result) {
//       console.log(`found user with username ${result.fullname}`);
//       console.log(result);
//   }
//   else {
//       console.log("no user found");
//   }
// }

// async function addUser(client, newUser) {
//   const result = await client.db("userData").collection("users").insertOne(newUser)

//   console.log(`New user created with id: ${result.insertedId}`)
// }

// async function listDatabases(client) {
//   const dataBasesList = await client.db().admin().listDatabases()
//   dataBasesList.databases.forEach(db => {
//     console.log(`-${db.name}`)
//   });
// }

// const initializePassport = require('./passport-config')
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )

// const users = []
// let name =""
// let user

// app.set('view-engine', 'ejs')
// app.use(express.urlencoded({ extended: false }))
// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))

// app.get('/', checkAuthenticated, (req, res) => {
//   res.render('index.ejs', { name: req.user.name })
// })

// app.get('/login', checkNotAuthenticated, (req, res) => {
//   res.render('login.ejs')
// })

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }))

// app.get('/register', checkNotAuthenticated, (req, res) => {
//   res.render('register.ejs')
// })

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     // const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     name = req.body.password
//     user = {
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password 
//     }
    
  
//     res.redirect('/details')
//   } catch {
//     res.redirect('/register')
//   }
// })

// app.get('/details', checkNotAuthenticated,(req,res)=> {
//   res.render('details.ejs',{name:name})
// })

// app.post('/details', (req,res) => {
//   user = {
//     ...user,
//     fullname: req.body.fullname,
//     age: Number(req.body.age),
//     weight: Number(req.body.weight),
//     height: Number(req.body.height),
//     targetWeight: Number(req.body.targetWeight),
//     gender: req.body.gender.value,
//     bmi: Number(req.body.BMI)
//   }

//   createUser(user).catch(console.error)

//   console.log(user)
//   res.redirect('/login')
// })



// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }

//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }

// app.listen(3000)


// app.use(express.static('public'))
// app.use('/css',express.static(__dirname+'public/css'))
// app.use('/css',express.static(__dirname+'public/js'))