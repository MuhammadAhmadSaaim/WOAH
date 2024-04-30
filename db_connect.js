const mongoose=require('mongoose');
const express = require('express')
const cors = require('cors'); 
//connection to mongodb
mongoose.connect("mongodb://localhost:27017/WOAH")
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

//portNo
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})