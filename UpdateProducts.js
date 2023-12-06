app.get("/UpdateProducts", function(req,res){
try {
    console.log("UpdateProducts");
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.query.ProductDescr) {
        return res.send({"status": "error", "message": "missing product description"});
    } else {
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, client) {
        if (err) {
            return res.send({"result": "failed"});
        } else {
            var db = client.db('team004');
            var collection = db.collection('products');
            const query = {"productID" : req.query.ProductID};
            console.log(query);
            console.log(req.query.ProductID);
                var newvalues = { $set: {"productID" : req.query.ProductID,
                        "productdescription": req.query.ProductDescr,
                        "productcategory": req.query.ProductCategory,
                        "productUOM": req.query.ProductUOM,
                        "productprice": req.query.ProductPrice,
                        "productweight": req.query.ProductWeight} };
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