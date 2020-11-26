const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {

     // creates a new client
    const client = await MongoClient(MONGO_URI, options);
    const dbName = "exercise_1";
      // connect to the client
      await client.connect();
    
     // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
        try {
          // TODO: connect...
          const result = await db.collection("greetings").insertOne(req.body);
          assert.equal(1, result.insertedCount);
          // TODO: declare 'db'
          // We are using the 'exercises' database
          // and creating a new collection 'greetings'

          res.status(201).json({ status: 201, data: req.body });
        } catch (err) {
          console.log(err.stack);
          res.status(500).json({ status: 500, data: req.body, message: err.message });
        }
        
        // TODO: close...
        client.close();
};
const deleteGreeting = async (req, res) => {

    // creates a new client
   const client = await MongoClient(MONGO_URI, options);
   const dbName = "exercise_1";
     // connect to the client
     await client.connect();
   
    // connect to the database (db name is provided as an argument to the function)
   const db = client.db(dbName);

   const _id = req.params._id;
       try {
         // TODO: connect...
         const result = await db.collection("greetings").deleteOne({"_id" : _id});
         assert.strictEqual(1, result.deletedCount);


         res.status(204).json({ status: 204, data: req.body, message:"greeting deleted" });
       } catch (err) {
         console.log(err.stack);
         res.status(500).json({ status: 500, data: req.body, message: err.message });
       }
       
       // TODO: close...
       client.close();
       
};
const getGreeting = async (req, res) => {

    // creates a new client
   const client = await MongoClient(MONGO_URI, options);
   const dbName = "exercise_1";
     // connect to the client
     await client.connect();
   
    // connect to the database (db name is provided as an argument to the function)
   const db = client.db(dbName);


   const _id = req.params._id;
       try {
        // console.log("req received: ", req.param);
        console.log("id received: ", _id);

        await db.collection("greetings").findOne({ _id }, (err, result) => {
            result
              ? res.status(200).json({ status: 200, _id, data: result })
              : res.status(404).json({ status: 404, _id, data: "Not Found" });
            client.close();
            console.log("disconnected!");
          });


       } catch (err) {
         console.log(err.stack);
        //  res.status(500).json({ status: 500, data: req.body, message: err.message });
       }
       


};

const updateGreeting = async (req, res) => {

    // creates a new client
   const client = await MongoClient(MONGO_URI, options);
   const dbName = "exercise_1";
     // connect to the client
     await client.connect();
   
    // connect to the database (db name is provided as an argument to the function)
   const db = client.db(dbName);

   const _id = req.body._id;
   const hello = req.body.hello;


    if(hello){//go inside only if there is a hello key
        try {
            // TODO: connect...
           //  const result = await db.collection("greetings").updateOne({"_id" : _id}, {$set: { "hello" :  newValue} });
            const result = await db.collection("greetings").updateOne({"_id" : _id}, {$set: { "hello" :  hello} });
            assert.strictEqual(1, result.matchedCount);
           assert.strictEqual(1, result.modifiedCount);
   
   
            res.status(201).json({ status: 201, data: req.body, message:"greeting updated" });
          } catch (err) {
            console.log(err.stack);
            res.status(500).json({ status: 500, data: req.body, message: err.message });
          }
    }else{
       
        res.status(500).json({ status: 500, data: req.body, message: "No hello key provided." });
    }

       
       // TODO: close...
       client.close();
       
};



const getManyGreetings = async (req, res) => {

    // creates a new client
   const client = await MongoClient(MONGO_URI, options);
   const dbName = "exercise_1";
     // connect to the client
     await client.connect();
   
    // connect to the database (db name is provided as an argument to the function)
   const db = client.db(dbName);



    //check if start and limit have been given, if not, give them default values
   let start = typeof req.query.start === "undefined" || !req.query.start ? 0 : req.query.start;
   let limit = typeof req.query.limit === "undefined" || !req.query.limit ? 25 : req.query.limit;



       try {

        const fullGreetings = await db.collection("greetings").find().toArray();

        let greetingsStart = fullGreetings.splice(start);
        
        let greetingsLimit = [];
        for (let i = 0; i < limit; i++) {
            greetingsLimit.push(greetingsStart[i]);
        }
        //remove any out of range object ('null') found previously
        //filter to prevent out of bounds range, doesn't prevent ALL cases
        let filteredResult = greetingsLimit.filter(function (el) {
            return el != null;
          });


            if(filteredResult.length === 0){
                res.status(404).json({
                    status: 404,
                    message: "the array is empty",
                });
            }else{
                res.status(200).json({
                    status: 200,
                    data: filteredResult,
                });
            }
       } catch (err) {
         console.log(err.stack);
         res.status(500).json({ status: 500, data: req.body, message: err.message });
       }
       


};

module.exports = {
    createGreeting,
    getGreeting,
    getManyGreetings,
    deleteGreeting,
    updateGreeting
};