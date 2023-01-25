const express = require('express');
const routes = require('./routes');

const PORT = 3001;
const app = express();

const connectionURI = 'mongodb://localhost:27017/social_DB';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
});