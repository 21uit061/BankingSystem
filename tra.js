const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3001;

app.use(express.static("E:/angular/public"));
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function insertData(accountnumber,amount) {
  try {
    await client.connect();
    const db = client.db("signup");
    const collection = db.collection("account");

    const document = {
      accountnumber:accountnumber,
      amount: amount,
    };

    const result = await collection.insertOne(document);
    console.log("Data inserted with _id: " + result.insertedId);
  } catch (err) {
    console.error("Error inserting data: ", err);
  } finally {
    await client.close();
  }
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/trans.html");
});

app.post("/sub", (req, res) => {
  const { accountnumber,amount } = req.body;
 
if ( accountnumber.length==12) {
    insertData(accountnumber,amount);
     res.send("amount transfered ");
  } else {
    res.status(400).send("Invalid data. Please check your input.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
