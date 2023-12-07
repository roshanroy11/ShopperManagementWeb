app.put("/UpdateReturns", function (req, res) {
    try {
        console.log("UpdateReturns");
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Origin", "*");

        var custname = req.body["Customer Name"];
        var custemail = req.body["Customer Email"];
        var productID = req.body["Product ID"];
        var quantity = req.body["Quantity"];
        var productName = req.body["Product Name"];

        if (!productID) {
            return res.status(400).send({ "result": "Missing the product ID" });
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

                    const query = { "Product ID": productID };
                    var newvalues = {
                        $set: {
                            "Customer Name": custname,
                            "Customer Email": custemail,
                            "Product ID": productID,
                            "Quantity": quantity,
                            "Product Name": productName
                        }
                    };

                    collection.updateOne(query, newvalues, function (err, result) {
                        if (err) throw err;

                        if (result.modifiedCount === 1) {
                            client.close();
                            return res.send({ "result": "passed" });
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
        return res.status(500).send({ "result": "Internal server error" });
    }
});