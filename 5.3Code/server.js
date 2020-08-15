var qs =require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"
var dataArr = new Array();
require('http').createServer(function(req,res){
    var body='';
    req.on('data',function(chunk){
        body+=chunk;
    });
    req.on('end',function(){
        res.writeHead(200);
        res.end('Done');
        console.log('\n  got Temporature \033[90m'+qs.parse(body).tem+'\033[39m\n');
        var testMessage='';
        testMessage = qs.parse(body).tem;
        dataArr.push(testMessage);
        console.log("The total temperature array is : "+dataArr);
        MongoClient.connect(url, {useNewUrlParser: true }, function(err, db){
            if(err)
                throw err;
            var dbo = db.db("SIT314");
            var sensorData = {temperature:testMessage};
            dbo.collection("TemperatureChase").insertOne(sensorData, function(err,res){
                if(err)
                    throw err;
                else
                    console.log("insert successfully!");
                    db.close();
            })
        })
    })
}).listen(3000);







