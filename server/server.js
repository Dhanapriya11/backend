const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



// Create an express app
const app = express();

// Middleware
app.use(cors({ origin: "https://frontend-olive-chi-14.vercel.app/" }));

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://dhanapriya731:WDFSqH42FkuB5wGH@dhana.5uwrb.mongodb.net/fashionStore?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));




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
    console.log("✅ Casuals Data Fetched:", casuals); // Debugging
    res.json(casuals);
  } catch (err) {
    console.error("❌ Database Fetch Error:", err);
    res.status(500).send(`Error fetching data: ${err.message}`);
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

  const PartyWear = mongoose.model('PartyWear', partyWearSchema);

  app.get('/partywears', async (req, res) => {
    try {
      const partywears = await PartyWear.find();
      res.json(partywears);
    } catch (err) {
      res.status(500).send('Error fetching data for Party Wear');
    }
  });

  const formalWearSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    rating: Number,
    offers: String
});

// Create a model for formal wear
const FormalWear = mongoose.model('FormalWear', formalWearSchema, 'formalwears');

// Get all formal wear items
app.get('/formalwears', async (req, res) => {
    try {
        const formals = await FormalWear.find();
        res.json(formals);
    } catch (err) {
        res.status(500).send('Error fetching data for Formal Wear');
    }
});

const traditionalWearSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  offers: String
});

const TraditionalWear = mongoose.model('TraditionalWear', traditionalWearSchema);

app.get('/traditionalwears', async (req, res) => {
  try {
    const traditionalWears = await TraditionalWear.find();
    res.json(traditionalWears);
  } catch (err) {
    res.status(500).send('Error fetching traditional wear');
  }
});


const dressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  offers: { type: String, default: "" },
  category: { type: String, required: true }
});

const Dress = mongoose.model('Dress', dressSchema);

// Define Comment Schema
const commentSchema = new mongoose.Schema({
  dressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dress' }, 
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  user: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Fetch a single dress by ID
app.get('/dresses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if ID is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Dress ID format" });
    }

    const dress = await Dress.findById(id);
    
    if (!dress) {
      return res.status(404).json({ error: "Dress not found" });
    }

    res.json(dress);
  } catch (err) {
    console.error("Error fetching dress:", err);
    res.status(500).json({ error: "Error fetching dress details" });
  }
});

// Fetch comments for a specific dress
app.get('/comments/:id', async (req, res) => {
  try {
    const dressId = new mongoose.Types.ObjectId(req.params.id);  // Convert to ObjectId
    const comments = await Comment.find({ dressId });
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// Add a new comment to a dress
app.post('/comments/:id', async (req, res) => {
  try {
    const dressId = new mongoose.Types.ObjectId(req.params.id);  // Convert to ObjectId
    const { user, text, rating } = req.body;
    
    const newComment = new Comment({
      dressId,
      user,
      text,
      rating
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Error adding comment' });
  }
});
// Set the server to listen on a port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
