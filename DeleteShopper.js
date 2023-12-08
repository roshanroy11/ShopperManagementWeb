app.get("/DeleteShopper", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");
        if(!req.query.email) {
            return res.send({"result": "missing the shopper email"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url,function (err,client) {
                console.log(err);
                if (err) {
                    return res.send({"result": "delete failed"});
                } else {
                    const db = client.db('team004');
                    const collection = db.collection('shopper');
                    const query = { email:req.query.email};
                    console.log("email:" + req.query.email);
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