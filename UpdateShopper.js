app.get("/UpdateShopper", function(req,res){
    try {
        console.log("UpdateShopper");
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");
        if(!req.query.name) {
            return res.send({"status": "error", "message": "missing shopper name"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    return res.send({"result": "failed"});
                } else {
                    var db = client.db('team004');
                    var collection = db.collection('shopper');
                    const query = {"email" : req.query.email};
                    console.log(query);
                    console.log(req.query.email);
                    var newvalues = { $set: {"email" : req.query.email,
                            "shoppername": req.query.name,
                            "shopperphonenum": req.query.contact-phone,
                            "age": req.query.age,
                            "address": req.query.address} };
                    collection.updateOne(query,newvalues, function(err, res) {
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