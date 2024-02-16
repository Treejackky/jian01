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


app.post('/v1/get',async (req, res) => {
  console.log('hello');
  const { email} = req.body;
  console.log(req.body);

  const Email = new User(req.body)
  const save1 = await Email.save()

  res.send({body:"jian"});
});


// mongoose.connect('mongodb+srv://s6304062636324:<dkoyo8BHLu9g4ujk>@cocohotel.9udsak7.mongodb.net/?retryWrites=true&w=majority');

// mongoose.pluralize(null);

// // สร้างโมเดล User
// const User = mongoose.model('users', {
//   email: String,
//   password: String,
//   confirmPassword: String,
//   Name: String,
//   Lastname: String,
// });

// // เส้นทางสำหรับการลงทะเบียนผู้ใช้
// app.post('/api/register', async (req, res) => {
//   try {
//     console.log('Request body:', req.body); // ตรวจสอบข้อมูลที่ถูกส่งมาจาก client
//     const { email,password,confirmPassword,Name,Lastname } = req.body;
//     const user = new User(req.body);
//     await user.save();
//     console.log('User saved successfully:', user); // ตรวจสอบข้อมูลผู้ใช้ที่ถูกบันทึกลงใน MongoDB
//     res.status(201).send('User registered successfully');
//     return; // ส่ง response แล้วหยุดการทำงานของ function ทันที
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).send('Registration error');
//   }
  
// });
// app.post('/v1/get',async (req, res) => {
//   console.log('hello');
//   const { email} = req.body;
//   console.log(req.body);

//   const Email = new User(req.body)
//   const save1 = await Email.save()

//   res.send({body:"jian"});
// });

app.listen(8765, () => {
  console.log('Server is running on port 8765');
});


module.exports = app;