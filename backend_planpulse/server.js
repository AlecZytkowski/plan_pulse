const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const bcrypt = require('bcrypt');

//Directs to the .ENV file to gather the DB Connection String.
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//Give connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Success message
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Convert JSON
app.get('/', (req, res) => {
  res.send(JSON.stringify(req));
});

//Routes
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

//Console log the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});