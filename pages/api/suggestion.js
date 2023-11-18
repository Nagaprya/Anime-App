import axios from "axios";

        
export default async function handler(req, res) {
  var MongoClient = require('mongodb').MongoClient

  //Create a MongoDB client, open a connection to DocDB; as a replica set,
  //  and specify the read preference as secondary preferred
  
  var client = MongoClient.connect(
  'mongodb://ccgrp34:ccgrp34\.@cc-cluster-grp34.cmvaiestirl0.us-east-2.docdb.amazonaws.com:27017/sample-database?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',
  {
    tlsCAFile: `global-bundle.pem` //Specify the DocDB; cert
  },
  function(err, client) {
      if(err)
          throw err;
  
      //Specify the database to be used
      db = client.db('sample-database');
  
      //Specify the collection to be used
      col = db.collection('sample-collection');
  
      //Insert a single document
      col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
        //Find the document that was previously written
        col.findOne({'hello':'DocDB;'}, function(err, result){
          //Print the result to the screen
          console.log(result);
  
          //Close the connection
          client.close()
        });
     });
  });
    //res.send
}
