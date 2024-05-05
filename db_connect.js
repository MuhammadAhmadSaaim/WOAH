const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Express
const app = express();
const port = 5000;

// Setup middleware before defining routes
app.use(cors());
app.use(express.json());

// Connection to MongoDB
mongoose
  .connect("mongodb+srv://ali:alinawaz1@cluster0.pc6svvj.mongodb.net/WOAH?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB connected successfully');

    // Define routes only after successful database connection
    app.use('/auth', require('./routes/auth'));
    app.use('/create', require('./routes/store'));
    app.use('/bid', require('./routes/auction'));
    app.use('/carttwo', require('./routes/cartTwo'));

    // Serve static files from the "frontend" build folder
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));

    // Default route to serve the frontend
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
    process.exit(1); // Exit the process to prevent undefined behavior
  });
