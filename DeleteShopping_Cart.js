app.get("/DeleteShopping_Cart", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");
        if(!req.query.ProductName) {
            return res.send({"result": "missing the product Name"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url,function (err,client) {
                console.log(err);
                if (err) {
                    return res.send({"result": "delete failed"});
                } else {
                    const db = client.db('team004');
                    const collection = db.collection('shopping cart');
                    const query = { productName:req.query.ProductName};
                    console.log("productName:" + req.query.ProductName);
                    collection.deleteOne(query, function(err, obj) {
                        if (err) throw err;
                        client.close();
                        return res.send({"result": "passed"});
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});