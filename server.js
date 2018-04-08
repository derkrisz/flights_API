const express = require('express');
const server = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  }

  const db = client.db("edi_flights");

  //return all flights

  server.get('/flights', function(req, res){
    db.collection('flights').find().toArray(function(err, results){
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(results);
    })
  });

  //return all arrivals

  server.get('/flights/arrivals', function(req, res){
    db.collection('flights').find({ArrDep: "A"}, {_id: 0}).toArray(function(err, results){
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(results);
    })
  });

  //return all departures

  server.get('/flights/departures', function(req, res){
    db.collection('flights').find({ArrDep: "D"}, {_id: 0}).toArray(function(err, results){
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(results);
    })
  });

  // return a specific flight

  server.get('/flights/flight/:FlightNo', function(req, res){
    db.collection('flights').findOne({FlightNo: req.params.FlightNo}, function(err, results){
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(results);
    })
  });

  server.listen(3000, function() {
    console.log('Server running on port ' + this.address().port);
  })

});
