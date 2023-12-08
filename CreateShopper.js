app.get("/CreateShopper",function (req,res) {
    try{
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Orgin","*");
        console.log("email: " + req.query.email);
        if(!req.query.email) {
            console.log("missing the shopper email");
            return res.send({"result": "missing the shopper email"});
        } else{
            var shopper = {
                "email": req.query.email,
                "shoppername": req.query.name,
                "shopperphonenum": req.query.contact-phone,
                "age": req.query.age,
                "address": req.query.address
            }
            console.log(shopper);
            var  url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err,client){
                if (err) {
                    console.log(err);
                    return res.send({"result": "failed"});
                } else {
                    var db = client.db("team004");
                    var collection = db.collection('shopper');
                    collection.insertOne(shopper, function (err,res){
                        if (err) throw err;
                        client.close();
                    });
                    return res.send({"result" : "passed"});
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});