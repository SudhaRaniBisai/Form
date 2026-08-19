require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student");

const app = express();

// EJS
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

// Home page
app.get("/", (req, res) => {
    res.render("register");
});

// Register student
app.post("/register", async (req, res) => {
    try {
        console.log("Form data received:", req.body);

        const { studentId, name } = req.body;

        const student = new Student({
            studentId: studentId,
            name: name
        });

        const savedStudent = await student.save();

        console.log("Student saved:", savedStudent);

        res.send("Student registered successfully!");
    } catch (err) {
        console.log("Error registering student:", err);
        res.status(500).send("Error registering student");
    }
});
// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
