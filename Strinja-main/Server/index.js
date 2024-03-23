const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const User = require('./user.js');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// MongoDB connection string
const mongoURI = 'mongodb+srv://Harshal:3YJfLzhmv9RBiF6j@cluster0.50encmi.mongodb.net/raja-rani';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define routes

// Route to handle user login
// Route to handle user login
// Route to handle user login
app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if the username and password are valid by querying the database
    const user = await User.findOne({ name, password });

    if (user) {
      // Redirect to "/" on successful login
      res.status(200).json({ redirectTo: "/" });
    } else {
      // Send an error message if login is unsuccessful
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to handle user registration
app.post('/register', async (req, res) => {
  try {
    const { name, password, courses, ratings } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      // Send an error message if the user already exists
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user instance
    const newUser = new User({
      name,
      password,
      courses,
      ratings
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Redirect to "/" or send success message
    res.status(201).json(savedUser); // You can customize this response as needed
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assuming you have your User model defined

// Route to fetch user's courses
app.get('/courses', async (req, res) => {
  try {
    // Assuming you have a way to identify the logged-in user, such as a user ID stored in the session or token
    const userId = req.session.userId; // Adjust this according to your authentication mechanism
    
    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's courses
    res.status(200).json({ courses: user.courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/:username/courses', async (req, res) => {
  try {
    const username = req.params.username;

    // Find user by username in the database
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract and send user's course array in the response
    res.status(200).json({ courses: user.courses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
