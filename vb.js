
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3002; // Use a different port for pg1.js

app.use(express.static("E:/angular/public"));
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/balance.html");
});
app.post("/div", async (req, res) => {
  const { accountNumber } = req.body;

  try {
    await client.connect();
    const db = client.db("signup");
    const collection = db.collection("account");

    const user = await collection.findOne({ accountnumber: accountNumber });

    if (user) {
    
      res.json({ amount: user.amount }); 
    } else {
 
      res.status(400).send("No account Number");
    }
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).send("An error occurred during login.");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});