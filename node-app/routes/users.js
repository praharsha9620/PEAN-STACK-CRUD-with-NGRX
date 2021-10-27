var express = require('express');
var router = express.Router();
const DB = require('../services/DB');
const checkAuth = require('../middleware/check-auth');
const jwt = require("jsonwebtoken")
const SECRET = "dummy";

router
    // .get('/',checkAuth, async function (req, res) {
    //     DB('employee_data1 AS e')
    //     .join('department','e.d_id','department.id')
    //     .select('*','e.id as id','e.name as name','department.name as department')
    //     .then((data)=>{ return res.status(200).send(data)})
    //     .catch((err) => { console.log(err); });
    //   })
  // .get('/', async function (req, res) {
  //   console.log("inside get");
  //   DB('employee_data1')
  //   .then((data)=>{ return res.status(200).send(data)})
  //   .catch((err) => { console.log(err); });
  // })

  .get('/', checkAuth,async function (req, res) {
    DB('employee_data1 AS e')
      .join('department', 'e.d_id', 'department.id')
      .select('*', 'e.id as id', 'e.name as name', 'department.name as department')
      .then((data) => {
        let offset = parseInt(req.query.offset) || 0;
        let size = parseInt(req.query.limit) || data.length;
        let from = offset * size;
        let to = from + size;
        let empData = data.slice(from, to);
        return res.status(200).send({data:empData,total:data.length})
      })
      .catch((err) => { console.log(err); });
  })
  .get('/sort', checkAuth,async function (req, res) {
      const column = req.query.column =='name'? 'e.name': req.query.column;
      DB('employee_data1 AS e')
        .join('department', 'e.d_id', 'department.id')
        .select('*', 'e.id as id', 'e.name as name', 'department.name as department')
        .orderBy([{column:column||'e.name',order:req.query.direction||'asc'}])
        .returning('*')
        .then((data) => {
          let offset = parseInt(req.query.offset) || 0;
          let size = parseInt(req.query.limit) || data.length;
          let from = offset * size;
          let to = from + size;
          let empData = data.slice(from, to);
          return res.status(200).send({data:empData,total:data.length})
        })
        .catch((err) => { console.log(err); });
    })
  .get('/:id',checkAuth, async function (req, res) {
    DB('employee_data1')
    .where('id','=',req.params.id )
    .then((data)=>{ return res.status(200).send(data)})
    .catch((err) => { console.log(err); });
  })
  .post("/", function (req, res) {
    DB('employee_data1')
      .insert(req.body)
      .returning('*')
      .then((result) => { return res.status(200).send(result[0]) })
      .catch((err) => { console.log(err); });
  })
  .put("/:id",checkAuth, function (req, res) {
    DB('employee_data1')
      .where('id','=',req.params.id )
      .update(req.body)
      .returning('*')
      .then((result) => { return res.status(200).send(result[0]) })
      .catch((err) => { console.log(err); });
  })

  .delete("/:id",checkAuth, function (req, res) {
     DB('employee_data1')
       .where('id','=',req.params.id )
       .delete()
       .returning('id')
       .then((result) => { return res.status(200).send(result) })
       .catch((err) => { console.log(err); });
   });



module.exports = router;
