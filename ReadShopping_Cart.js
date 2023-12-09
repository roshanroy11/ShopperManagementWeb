app.get("/ReadShopping_Cart", function (req,res) {
    try{
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Acess-Control-Allow-Origin", "*");
        if(!req.query.ProductName) {
            return res.send({"result": "missing the product Name"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    return res.send({"result" : "failed"});
                } else {
                    var db = client.db('team004');
                    var collection = db.collection('shopping cart');
                    collection.findOne({"productName": req.query.ProductName}, function (err, shopping_cart) {
                        if (err) throw err;
                        client.close();
                        console.log(shopping_cart);
                        return res.send(shopping_cart);
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});