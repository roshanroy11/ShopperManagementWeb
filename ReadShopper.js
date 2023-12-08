app.get("/ReadShopper", function (req,res) {
    try{
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Acess-Control-Allow-Origin", "*");
        if(!req.query.email) {
            return res.send({"result": "missing the shopper email"});
        } else {
            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    return res.send({"result" : "failed"});
                } else {
                    var db = client.db('team004');
                    var collection = db.collection('shopper');
                    collection.findOne({"email": req.query.email}, function (err, shopper) {
                        if (err) throw err;
                        client.close();
                        console.log(shopper);
                        return res.send(shopper);
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});