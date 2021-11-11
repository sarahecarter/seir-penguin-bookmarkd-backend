////////////////////
// Dependencies
////////////////////
require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const {PORT = 3001, DATABASE_URL} = process.env

////////////////////
// Database Connection
////////////////////
// Establish DB connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (err) => console.log(err))

////////////////////
// Bookmark Model
////////////////////
const BookmarkSchema = new mongoose.Schema({
    title: String,
    url: String
})

const Bookmark = mongoose.model("Bookmark", BookmarkSchema)

////////////////////
// Routes
////////////////////
app.get("/", (req, res) => {
    res.send("Hello World")
})

////////////////////
// Listener
////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));