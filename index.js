const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
// เชื่อมต่อ MongoDB

let token = 'dkoyo8BHLu9g4ujk';

const uri = "mongodb+srv://s6304062636324:"+token+"@cocohotel.9udsak7.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


mongoose.connect(uri);
mongoose.pluralize(null);


const User = mongoose.model('users', {
  email: String,
});


app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});


app.get('/user', (req, res) => {
   User.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post('/item',async (req, res) => {
  console.log('hello');
  const { email} = req.body;
  console.log(req.body);

  const Email = new User(req.body)
  const save1 = await Email.save()

  res.send({body:"jian"});
});


app.listen(9001, () => {
  console.log('Server is running on port 9001');
});


module.exports = app;