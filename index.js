const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');

app.use(express.json()); // Use Express's built-in body-parser
app.use(cors());

// MongoDB Connection URI
let token = 'dkoyo8BHLu9g4ujk';
const uri = `mongodb+srv://s6304062636324:${token}@cocohotel.9udsak7.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB with Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

mongoose.pluralize(null); // Prevent Mongoose from pluralizing collection names

// Define a Mongoose model for users
const User = mongoose.model('users', { email: String });

// Root endpoint
app.get('/', (req, res) => {
  res.send({
    api: 'Coco Hotel API',
    version: '1.0.0',
    endpoints: ['/user', '/item']
  });
});

// Get all users
app.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users from database');
  }
});

// Create a new user
app.post('/item', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const users = await User.find(); // Optionally, you can just return the newUser if you don't need to return all users
    res.json(users);
  } catch (error) {
    res.status(500).send('Error saving the user');
  }
});

// Delete a user
app.post('/item_del', async (req, res) => {
  const { id } = req.body;
  try {
    await User.findByIdAndDelete({ _id: id});
    const users = await User.find(); // Return the updated list of users
    res.json(users);
  } catch (error) {
    res.status(500).send('Error deleting the user');
  }
});

// Start the server
app.listen(9001, () => {
  console.log('Server is running on port 9001');
});

module.exports = app;
