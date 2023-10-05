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
app.get("/getusers", (req, res) => {
  const connectAndQuery = async () => {
    try {
      const client = await MongoClient.connect(connectionString);
      const database = client.db();
      const documents = await database.collection("UserDetails").find({}).toArray();
      res.send(documents);
      client.close();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred while connecting to the database.");
    }
  };

  connectAndQuery();
});

app.post("/postuser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }
  const connectAndInsert = async () => {
    try {
      const client = await MongoClient.connect(connectionString);
      const database = client.db();
      const collection = database.collection("UserDetails");
      const user = { UserName: username, Password: password };
      await collection.insertOne(user);
      res.status(201).json({ message: "User created successfully." });
      client.close();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while connecting to the database." });
    }
  };

  connectAndInsert();
});




app.listen(2000);
console.log("Server started: http://127.0.0.1:2000/");
