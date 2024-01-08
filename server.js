const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const PORT = process.env.PORT || 3004;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const data = [
  {
    email: "bishal123@gmail.com",
    post: "Hello Bishal",
  },
  {
    email: "pankaj123@gmail.com",
    post: "Hello Hii Pankaj",
  },
  {
    email: "bishal123@gmail.com",
    post: "Hello",
  },
  {
    email: "bishal123@gmail.com",
    post: "Hello",
  },
];

app.get('/posts', authincateUser, (req, res) => {
    res.json(data.filter((post)=>post.email === req.userData.email));
})

app.post("/login",(req, res) => {
    const email = { "email":req.body.email }
    const Token = jwt.sign(email,ACCESS_TOKEN,{expiresIn:"5h"});
    res.json(Token);

})

//Middleware
function authincateUser(req, res, next) {
    //Headers
    //BEARER TOKEN
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.sendStatus(401)
    }

    jwt.verify(token, ACCESS_TOKEN, (err, data) => {
        if (err) {
            res.sendStatus(403)
        }
      req.userData = data;
      console.log(data);
      next();
    })
}

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server Started at ${PORT}`);
})