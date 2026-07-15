const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const intDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }

  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!mongoUri) {
    return callback('Missing MONGODB_URI environment variable');
  }

  MongoClient.connect(mongoUri)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }

  return database;
};

module.exports = {
  initDB: intDb,
  getDB: getDatabase,
};
