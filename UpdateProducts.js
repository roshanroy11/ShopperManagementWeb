app.get("/UpdateProducts", function(req,res){
try {
    console.log("UpdateProducts");
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.query.productDesc) {
        return res.send({"status": "error", "message": "missing product description"});
    } else {
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, client) {
        if (err) {
            return res.send({"result": "failed"});
        } else {
            var db = client.db('team004');
            var collection = db.collection('products');
            const query = {"ProductID" : req.query.productId};
            console.log(query);
            console.log(req.query.productId);
                var newvalues = { $set: {"ProductID" : req.query.productId,
                        "ProductName": req.query.productDesc,
                        "ProductCategory": req.query.productCategory,
                        "ProductUnitOfMeasure": req.query.productUOM,
                        "ProductPrice": req.query.productPrice,
                        "ProductWeight": req.query.productWeight} };
            collection.updateOne(query,newvalues, function(err, res) {
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