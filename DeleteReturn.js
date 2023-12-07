app.delete("/DeleteReturns", function (req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");

        if (!req.query.ProductID) {
            return res.status(400).send({"result": "Missing the product ID"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    console.error(err);
                    return res.status(500).send({"result": "Delete failed"});
                } else {
                    const db = client.db('team004');
                    const collection = db.collection('returns'); s
                    const query = { "Product ID": req.query.ProductID };

                    collection.deleteOne(query, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send({"result": "Delete failed"});
                        }

                        if (result.deletedCount === 1) {
                            return res.send({"result": "Passed"});
                        } else {
                            return res.status(404).send({"result": "Product not found"});
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({"result": "Internal server error"});
    }
});