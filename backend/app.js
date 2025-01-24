const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const userRoutes = require("./routes/user-route");
const cors = require("cors");
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("running");
});

app.use(userRoutes);

async function connectDB() {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/UserDB";
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err);
    }
}

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
