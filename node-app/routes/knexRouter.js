
var express = require('express');
var router = express.Router();
const DB = require('../services/DB');
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET = "dummy";
const exp=6000000000000;
// const exp="2m";


router
// .get('/', async function (req, res) {
//     DB('employee_data1 AS e')
//     .join('department','e.d_id','department.id')
//     .select('*','e.id as id','e.name as name','department.name as department')
//     .then((data)=>{ return res.status(200).send(data)})
//     .catch((err) => { console.log(err); });
//   })
  .post("/users", (request, response, next) => {
   bcrypt.hash(request.body.password, 10)
   .then(hashedPassword => {
      return DB("userlogin").insert({
         username: request.body.username,
         password: hashedPassword
      })
      .returning(["id", "username"])
      .then(users => {
         response.json(users[0])
      })
      .catch(error => next(error))
   })
})
  .post("/", (request, response, next) => {
   DB("userlogin")
   .where({username: request.body.username})
   .first()
   .then(user => {
      if(!user){
         response.status(401).json({
            error: "No user by that name"
         })
      }else{
         return bcrypt
         .compare(request.body.password, user.password)
         .then(isAuthenticated => {
            if(!isAuthenticated){
               response.status(401).json({
                  error: "Unauthorized Access!"
               })
            }else{
               return jwt.sign(user, SECRET, (error, token) => {
                  response.status(200).json({token,"expires":exp})
               })
            }
         })
      }
   })
})
.get("/verify", (request, response, next) => {
   const token = request.headers.authorization.split(" ")[1]
   jwt.verify(token, SECRET, (error, decodedToken) => {
      if(error){
         response.status(401).json({
            message: "Unauthorized Access!"
         })
      }else{
         response.status(200).json({
            id: decodedToken.id,
            username: decodedToken.username
         })
      }
   })
})






module.exports = router;
