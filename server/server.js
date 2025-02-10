const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://dhanapriya731:WDFSqH42FkuB5wGH@dhana.5uwrb.mongodb.net/?retryWrites=true&w=majority&appName=dhana')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a casual wear schema
const casualSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  offers: String
});

// Create a model for casual wear
const Casual = mongoose.model('Casual', casualSchema);

// Get all casual wear items
app.get('/casuals', async (req, res) => {
  try {
    const casuals = await Casual.find();
    res.json(casuals);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

const partyWearSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    rating: Number,
    offers: String
  });
