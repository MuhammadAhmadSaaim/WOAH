const mongoose=require('mongoose');
const express = require('express')
const cors = require('cors'); 
//connection to mongodb
mongoose.connect("mongodb://localhost:27017/users")
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

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})