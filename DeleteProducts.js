app.get("/DeleteProducts", function(req, res) {
try {
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.query.productId) {
        return res.send({"result": "missing the product ID"});
    } else {
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url,function (err,client) {
        console.log(err);
        if (err) {
            return res.send({"result": "delete failed"});
        } else {
          const db = client.db('team004');
          const collection = db.collection('products');
          const query = { ProductID:req.query.productId};
          console.log("ProductID:" + req.query.productId);
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