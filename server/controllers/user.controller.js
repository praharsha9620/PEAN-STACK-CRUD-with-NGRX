
const _ = require('lodash');



const Pool = require('pg').Pool;

pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '1234',
    dialect: 'postgres',
    port: 5432
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
module.exports.register = (req, res, next) => {
    console.log(req.body.name);
        var name1=req.body.name;
        var email1=req.body.email;
        var pswd1=req.body.password;    

        pool.query('INSERT INTO usertable(name,email,password) values($1,$2,$3) RETURNING *',[name1,email1,pswd1], (error, results) => {
                    if (error) {
                        throw error
                    }
                    res.status(200).json(results.rows[0])
                })
                console.log("Inserted Successfully");


    // user.fullName = req.body.fullName;
    // user.email = req.body.email;
    // user.password = req.body.password;
    // user.save((err, doc) => {
    //     if (!err)
            // res.send(doc);
    //     else {
    //         if (err.code == 11000)
    //             res.status(422).send(['Duplicate email adrress found.']);
    //         else
    //             return next(err);
    //     }

    // });
}


module.exports.addData = (req, res, next) => {
    console.log(req.body.name);
        var name1=req.body.name;
        var email1=req.body.email;
        var address1=req.body.address;
        var state1=req.body.state;
        var city1=req.body.city;

        pool.query('INSERT INTO employeee(name,address,email,state,city) values($1,$2,$3,$4,$5) RETURNING *',[name1,address1,email1,state1,city1], (error, results) => {
                    if (error) {
                        throw error
                    }
                    res.status(200).json(results.rows[0])
                })
                console.log("Inserted Successfully");
}





module.exports.authenticate = (req, res, next) => {
    console.log(req.body.email);
    var email1=req.body.email;
    var pswd1=req.body.password; 



  
 

}
