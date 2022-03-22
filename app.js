const express = require('express')
const posts = require('./posts')
const signupUser = require('./signupUser')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'API is working'
  })
})


app.get('/posts', (req, res) => {
  res.json(posts)
})

app.get('/signupUser', (req, res) => {
  res.json(signupUser)
})

app.post('/posts', (req, res) => {

  if (!req.body.email) {
    res.status(400)
    return res.json({
      error: "email required!!.."
    })
  }

  const user = {
    id: posts.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    salary: req.body.salary
  }
  posts.push(user)
  res.json(user)
})

app.post('/signupUser', (req, res) => {

  const user = {
    id: signupUser.length + 1,
    fullname: req.body.fullname,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password
  }
  signupUser.push(user)
  res.json(user)
})

app.put('/posts/:id', (req, res) => {
  let id = req.params.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let contact = req.body.contact
  let salary = req.body.salary

  let index = posts.findIndex((post) => {
    return (post.id == id)
  })

  if (index >= 0) {
    const std = posts[index]
    std.firstName = firstName
    std.lastName = lastName
    std.email = email
    std.contact = contact
    std.salary = salary
    res.json(std)
  } else {
    res.status(404)
  }
})


app.delete('/posts/:id',(req,res)=>{
let id=req.params.id;
let index=posts.findIndex((post)=>{
  return (post.id == id)
}) 

if(index >= 0){
  const std=posts[index]
  posts.splice(index,1)
  res.json(std)
}else{
  res.status(404)
  res.end()
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})