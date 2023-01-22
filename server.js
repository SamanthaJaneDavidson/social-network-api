const express = require('express');
const routes = require('./routes');
const mongodb = require('mongodb').MongoClient;

const PORT = 3001;
const app = express();

const connectionURI = 'mongod://localhost/socialDB';

// let db;

mongodb.connect(
    connectionURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
      });
    }
  );


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

// db.once('open', () => {
//     app.listen(PORT, () => {
//         console.log(`Example app listening at http://localhost:${PORT}`);
//   });
// });
