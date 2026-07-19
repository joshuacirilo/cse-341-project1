const dotenv = require('dotenv');
dotenv.config({ quiet: true });

const MongoClient = require('mongodb').MongoClient;

let database;

const getMongoUri = () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!mongoUri) {
    return null;
  }

  const parsedUri = new URL(mongoUri);

  if (parsedUri.protocol !== 'mongodb+srv:' || parsedUri.host !== 'cluster0.qsm49cb.mongodb.net') {
    return mongoUri;
  }

  const hosts = [
    'ac-rfonwom-shard-00-00.qsm49cb.mongodb.net:27017',
    'ac-rfonwom-shard-00-01.qsm49cb.mongodb.net:27017',
    'ac-rfonwom-shard-00-02.qsm49cb.mongodb.net:27017'
  ].join(',');

  return `mongodb://${parsedUri.username}:${parsedUri.password}@${hosts}${parsedUri.pathname}?ssl=true&authSource=admin&retryWrites=true&w=majority`;
};

const intDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }

  const mongoUri = getMongoUri();

  if (!mongoUri) {
    return callback('Missing MONGODB_URI environment variable');
  }

  MongoClient.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  })
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
