app.get("/ReadReturn", function (req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");

        if (!req.query.ProductID) {
            return res.send({ "result": "Missing the product ID" });
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    return res.send({ "result": "Failed" });
                } else {
                    var db = client.db('team004');
                    var collection = db.collection('returns');

                    collection.findOne({ "Product ID": req.query.ProductID }, function (err, returnData) {
                        if (err) throw err;

                        if (returnData) {
                            client.close();
                            console.log(returnData);
                            return res.send(returnData);
                        } else {
                            client.close();
                            return res.status(404).send({ "result": "Product not found" });
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});