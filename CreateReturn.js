app.post("/CreateReturns", function (req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");

        var custname = req.body["Customer Name"];
        var custemail = req.body["Customer Email"];
        var productID = req.body["Product ID"];
        var quantity = req.body["Quantity"];
        var productName = req.body["Product Name"];

        if (!productID) {
            console.log("Missing the product ID");
            return res.send({ "result": "Missing the product ID" });
        } else {
            var returnData = {
                "Customer Name": custname,
                "Customer Email": custemail,
                "Product ID": productID,
                "Quantity": quantity,
                "Product Name": productName
            };

            console.log(returnData);

            var url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    console.log(err);
                    return res.send({ "result": "failed" });
                } else {
                    var db = client.db("team004");
                    var collection = db.collection('returns');
                    collection.insertOne(returnData, function (err, result) {
                        if (err) throw err;
                        client.close();
                    });

                    return res.send({ "result": "passed" });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});