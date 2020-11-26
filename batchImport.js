const fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {

     // creates a new client
     const client = await MongoClient(MONGO_URI, options);
     const dbName = "exercise_1";

    // connect to the client
    await client.connect();
    
     // connect to the database (db name is provided as an argument to the function)
     const db = client.db(dbName);


     
     

     try {

        const result = await db.collection("greetings").insertMany(greetings);
        assert.strictEqual(134, result.insertedCount);

        console.log("greetings inserted");
        

      } catch (err) {
        console.log("greetings insert error");
        console.log(err.stack);
        
      }


    // close the connection to the database server
    client.close();
    console.log("disconnected!");


}

batchImport();