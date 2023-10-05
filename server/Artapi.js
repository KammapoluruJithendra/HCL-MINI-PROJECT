var express = require("express");
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

var connectionString = "mongodb://127.0.0.1:27017/reactdb";

var app = express();
app.use(cors());
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
app.get("/getartworks", (req, res) => {
  const connectAndQuery = async () => {
    try {
      const client = await MongoClient.connect(connectionString);
      const database = client.db();
      const documents = await database.collection("tblusers").find({}).toArray();
      res.send(documents);
      client.close();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred while connecting to the database.");
    }
  };

  connectAndQuery();
});




app.listen(4000);
console.log("Server started: http://127.0.0.1:4000/");
