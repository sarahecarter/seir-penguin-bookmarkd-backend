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
    url: String,
    description: String 
})

const Bookmark = mongoose.model("Bookmark", BookmarkSchema)

////////////////////
// MiddleWare
////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

////////////////////
// Routes
////////////////////
app.get("/", (req, res) => {
    res.send("Hello World")
})

// Index Route
app.get("/bookmark", async (req, res) => {
    try {
        res.json(await Bookmark.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});
  
// Create Route
app.post("/bookmark", async (req, res) => {
    try {
        res.json(await Bookmark.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});  

// Delete Route
app.delete("/bookmark/:id", async (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the bookmark
    try {res.json(await Bookmark.findByIdAndRemove(id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update Route
app.put("/bookmark/:id", async (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the bookmark
    try {res.json(await Bookmark.findByIdAndUpdate(id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error);
    }
});

////////////////////
// Listener
////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));