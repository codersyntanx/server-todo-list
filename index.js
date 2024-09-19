require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./Routes/taskRoutes');
const authRoutes = require('./Routes/auth')
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



app.use('/api/tasks', taskRoutes);
app.use('/auth', authRoutes);


// Data base connection and listening on port number from env
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("db  is running on port 3003 ")
    app.listen(process.env.PORT, () => {
      console.log("db and server is running on port 3003 ")
    })
  });
