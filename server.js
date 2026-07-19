const express = require('express');
const mongodb = require('./data/database');
const app = express();



const port = process.env.PORT || 3000;

app.use('/', require('./routes'));



mongodb.initDB((err) => {
  if (err) {
    console.error('Could not connect to MongoDB. Check Atlas Network Access, your internet connection, or whether port 27017 is blocked.');
    console.error(err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening, Server is running on port ${port}`);
    });
  }
});
