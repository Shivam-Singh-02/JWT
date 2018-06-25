const Express = require('express')
const jwt = require ('jsonwebtoken')
const path = "4040"
const app = Express()
const secretKey = "im batman"



app.get('/', (req, res) => {
  res.json({
    message : "Welcome to API"
  })
})


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


// Validate User
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
