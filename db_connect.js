const mongoose=require('mongoose');
const express = require('express')
const cors = require('cors'); 
const path = require("path");
//connection to mongodb
mongoose.connect("mongodb+srv://ali:alinawaz1@cluster0.pc6svvj.mongodb.net/WOAH?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

//adding express js
const app = express()
const port = 5000
app.use(cors());
app.use(express.json());

//for login
app.use('/auth',require('./routes/auth'));
//item creation
app.use('/create',require('./routes/store'));
//bidding
app.use('/bid',require('./routes/auction'));
//newcart
app.use('/carttwo',require('./routes/cartTwo'));

//for vercel
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});  

//portNo
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})