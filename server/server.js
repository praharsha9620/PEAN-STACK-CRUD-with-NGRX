const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 8080;
const Pool = require('pg').Pool;

// pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'testdb',
//     password: '1234',
//     dialect: 'postgres',
//     port: 5432
// });

// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error(
//             'Error acquiring client', err.stack)
//     }
//     client.query('SELECT NOW()', (err, result) => {
//         release()
//         if (err) {
//             return console.error(
//                 'Error executing query', err.stack)
//         }
//         console.log("Connected to Database !")
//     })
// })

const rtsIndex = require('./router/index.router');


app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', rtsIndex);




app.get('/',function(req,res){
    res.send("Hello");
});


  
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});


// app.post('/login', function (req, res) {

// })
// app.get('/display', (request, response) => {
//     pool.query('SELECT * FROM employeee', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// })

// app.get('/display/:id', (request, response) => {
//     pool.query('SELECT * FROM employeee WHERE e_id=$1', [request.params.id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// })
// app.get('/insert',(request, response) => {
//     pool.query('INSERT INTO employeee(e_id,d_id,name,address,email,state,city) values($1,$2,$3,$4,$5,$6,$7) RETURNING *',[2,2,"emp2","x apartment,y street","emp2@gmail.com","Tamil Nadu","Madurai"], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows[0])
//     })
// })
// app.put('/update/:id',function(request,response){
//     pool.query("UPDATE employeee SET name = $2 WHERE e_id = $1 RETURNING *",[1,"Emp1"] ,(error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows[0])
//       });
// })


app.listen(port, () => {
    console.log(`app is running on port ${port}.`);
});