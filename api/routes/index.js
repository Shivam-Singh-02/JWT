// Require the needed libraries

const Express = require('express')
const jwt = require ('jsonwebtoken')
const path = "4040"


//Declare constants used
//dafault key used for creating token
const secretKey = "im batman"

//Make instance of Express
const app = Express()

// A Sample GET route
app.get('/', (req, res) => {
  res.json({
    message : "Welcome to API"
  })
})

// The protected route that uses the validation and middle function validateUser
app.post('/', validateUser, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    }
    res.json({
      message : "Authorised"
    })
  })
})


//The login route that produces the token to be used for login
app.post('/login', (req, res) => {
  const user = {
    id : 1,
    username : "Shivam"
  }
  jwt.sign(user, secretKey, (err, token) => {
    if (err){
      console.log("Error "+ err)
      res.send("Error "+ err)
    }
    res.json({
      token : token
    })
  })
})


// The middleware function that checks for the token and returns error if no Header is included
function validateUser(req, res, next) {

  const bearerHeader = req.headers['authorization']
  if (bearerHeader === undefined) {
    res.sendStatus(403)
  }
  const bearer = bearerHeader.split(" ")
  const bearerToken = bearer[1]
  req.token = bearerToken
  next()

}












app.listen(path, () => {
  console.log("[Info] Listening on "+path)
})
