const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Setup middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI; // Use environment variables
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Define routes
    app.use('/auth', require('./routes/auth'));
    app.use('/create', require('./routes/store'));
    app.use('/bid', require('./routes/auction'));
    app.use('/carttwo', require('./routes/cartTwo'));

    // Serve static files
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));

    // Default route for serving frontend
    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if connection fails
  });
