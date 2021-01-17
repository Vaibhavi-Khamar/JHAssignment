var request = require('request');
var MongoClient = require('mongodb').MongoClient;

let url = ' https://api.covidtracking.com/v1/us/current.json'; //public API with current covid nubers in US

request(url, function (error, response, body) {

  if (!error && response.statusCode == 200) {

    var data = JSON.parse(body);
    console.log("Printing all data from API");
    console.log(data);
    console.log("--------------------------------------");

    // connect to db and insert record
    MongoClient.connect('mongodb://127.0.0.1:27017/', function(err,db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log("Successfully connected to the database");

        dbo.collection('test').insertMany(data, function(err, records) {
            if (err) throw err;
            console.log("Data saved into db");
        });
    });
    
  } else if(err){
        console.log('error:', error);
  }
})
