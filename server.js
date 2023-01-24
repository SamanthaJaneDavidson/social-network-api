const express = require('express');
const routes = require('./routes');
const mongodb = require('mongodb').MongoClient;

const PORT = 3001;
const app = express();

const connectionURI = 'mongodb://localhost/social_DB';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongodb.connect(
    connectionURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
      });
    }
  );

