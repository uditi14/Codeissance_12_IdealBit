if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const {MongoClient, Logger} = require('mongodb')

let currentUser ={}

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
  let result = await client.db("userData").collection("users").findOne({email: email})
  user = result
  currentUser = result
  console.log(currentUser);

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
  res.render('index.ejs',{name:currentUser.fullname})
})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.post('/login', (req,res) =>{
  findUser(req.body.email)
  if (user == null) {
    res.redirect('/login')

  }
  else if (user.password == req.body.password) {
    res.redirect('/')
  }
  else {
    res.redirect('/login')
  }
  
})

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
    gender: req.body.gender,
    bmi: Number(req.body.BMI)
  }

  createUser(user).catch(console.error)

  console.log(user)
  res.redirect('/login')
})

app.get('/keepMeUpdated', (req,res) => {
  res.render('keepMeUpdated.ejs')
})

app.get('/form', (req,res) => {
  res.render('form.ejs')
})

app.get('/calc', (req,res) => {
  res.render('calc.ejs')
})

app.get('/community', (req,res) => {
  res.render('community.ejs')
})

app.get('/report', (req,res) => {
  res.render('report.ejs')
})

async function updateUser(updatedUser) {
  const uri = "mongodb+srv://hackathon_website:password_db@cluster0.vs1uu3w.mongodb.net/?retryWrites=true&w=majority"

  const client = new MongoClient(uri)

  try {
    await client.connect()

    update(client,updatedUser)
    // await findUser(client,"hgg")
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

async function update(client,updatedUser) {
  await client.db("userData").collection("users").updateOne({email:currentUser.email},{$set: updatedUser})
}

app.get('/updateProfile', (req,res) =>{
  console.log(currentUser);
  res.render('updateProfile.ejs', {
    fullname:currentUser.fullname,
    age:currentUser.age,
    weight: currentUser.weight,
    height: currentUser.height,
    BMI:currentUser.BMI,
    targetWeight:currentUser.targetWeight,

  })

})

app.post('/updateProfile',async (req,res) => {
    updatedUser = {
      // _id:"asjdkj",
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.fullname,
    age: Number(req.body.age),
    weight: Number(req.body.weight),
    height: Number(req.body.height),
    targetWeight: Number(req.body.targetWeight),
    gender: req.body.gender.value,
    bmi: Number(req.body.BMI) 
    }

    await updateUser(updatedUser)

    res.redirect('/')
})








app.listen(3000)


app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/images',express.static(__dirname+'public/images'))


