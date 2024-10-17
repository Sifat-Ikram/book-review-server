const express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.POST || 4321;

// middle wear
app.use();
app.use(express.json());


const verifyToken = (req, res, next) => {
  // console.log("inside middleware", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Access forbidden" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "Access forbidden" });
    }
    req.decoded = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jrqljyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("tasteTrail").collection("user");
    const reviewCollection = client.db("tasteTrail").collection("review");

    // middleware again

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "Access forbidden" });
      }
      next();
    };

    // jwt api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = await jwt.sign(user, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // user api
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.get("/user", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.patch("/user/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          name: item.name,
          email: item.email,
        },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // review api
    app.post("/review", async (req, res) => {
      const reviewItem = req.body;
      const result = await reviewCollection.insertOne(reviewItem);
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("book review is running");
});

app.listen(port, () => {
  console.log(`book review is running on port: ${port}`);
});