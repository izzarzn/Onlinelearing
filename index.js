const fs = require("fs");
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const User = require('./model/user');

app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/onlinelearing")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

app.post("/index", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).send("Error saving user data");
  }
});


app.listen(port, () => {
  console.log("Server is running on port ", port);
});