var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.all('/submit',function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    console.log('loginUser: ',username);
    console.log('loginPwd: ',password);
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { username: username, password: password };
        
        dbo.collection("users").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

    if(username=="admin"&&password=="123456"){
        res.send("Login success!");
    }else{
        res.send("Login failed!");
    }
});

module.exports = router;
