const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

app.use(express.static("E:/angular/public"));
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function insertData(username,password, confirmpassword) {
  try {
    await client.connect();
    const db = client.db("signup");
    const collection = db.collection("sign");

    const document = {
      username:username,
      password: password,
      confirmpassword: confirmpassword,
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
  res.sendFile(__dirname + "/Login.html");
});

app.post("/add", (req, res) => {
  const { username, password, confirmpassword } = req.body;
 

 

  if (password.length <= 10 && password == confirmpassword) {
    insertData(username,password, confirmpassword);
     res.redirect('/account.html')
  } else {
    res.status(400).send("Invalid data. Please check your input.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




