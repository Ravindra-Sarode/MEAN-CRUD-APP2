const express = require('express')
const app = express()
const port = process.env.port || 3000;
const mongoose = require('mongoose')
const userRoutes = require("./routes/user-route");
var cors = require("cors");

app.use(cors());
//this is the middleware 
app.use(express.json());
app.get('/', (req, res) => {
    res.send("running")
})

app.use(userRoutes);

async function connectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/", {
        dbname : "UserDB",
    });
}

connectDB().catch((err) =>{
    console.error(err);
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})
