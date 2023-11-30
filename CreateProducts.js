app.get("/CreateProducts",function (req,res) {
    try{
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        res.header("Access-Control-Allow-Orgin","*");
        console.log("productid: " + req.query.productId);
        if(!req.query.productid) {
            console.log("missing the product ID");
            return res.send({"result": "missing the product name"});
        } else{
            var products = {
                "ProductID": req.query.productId,
                "ProductName": req.query.productDesc,
                "ProductCategory": req.query.productCategory,
                "ProductUnitOfMeasure": req.query.productUOM,
                "ProductPrice": req.query.productPrice,
                "ProductWeight": req.query.productWeight
            }
            console.log(products);
            var  url = 'mongodb://localhost:27017';
            MongoClient.connect(url, function (err,client){
                if (err) {
                    console.log(err);
                    return res.send({"result": "failed"});
                } else {
                    var db = client.db("team004");
                    var collection = db.collection('products');
                    collection.insertOne(products, function (err,res){
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