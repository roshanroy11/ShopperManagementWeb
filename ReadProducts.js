app.get("/ReadProducts", function (req,res) {
try{
 var mongodb = require('mongodb');
 var MongoClient = mongodb.MongoClient;
    res.header("Acess-Control-Allow-Origin", "*");
    if(!req.query.productId) {
        return res.send({"result": "missing the product ID"});
    } else {
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, client) {
        if (err) {
            return res.send({"result" : "failed"});
        } else {
            var db = client.db('team004');
            var collection = db.collection('products');
            collection.findOne({"ProductID": req.query.productId}, function (err, products) {
                if (err) throw err;
                client.close();
                console.log(products);
                return res.send(products);
            });
        }
        });
    }
} catch (error) {
    console.error(error);
}
});