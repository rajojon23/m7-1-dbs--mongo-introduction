const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser  = async (req, res) => {

    // creates a new client
    const client = await MongoClient(MONGO_URI, options);
      const dbName = "exercise_1";
    // connect to the client
    await client.connect();
  
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");

    await db.collection("users").insertOne(req.body);

    res.status(200).json({
        status: 200,
        message: "user has been added",
    });

  
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};


module.exports = {
  addUser
};