app.get("/UpdateShopping_Cart", function(req,res){
    try {
        console.log("UpdateShopping_Cart");
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");
        if(!req.query.ProductDescr) {
            return res.send({"status": "error", "message": "missing product description"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    return res.send({"result": "failed"});
                } else {
                    var db = client.db('team004');
                    var collection = db.collection('shopping cart');
                    const query = {"productName" : req.query.ProductName};
                    console.log(query);
                    console.log(req.query.ProductName);
                    var newvalues = { $set: {"productName" : req.query.ProductName
                            }};
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