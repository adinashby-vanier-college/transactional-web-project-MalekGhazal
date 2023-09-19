const { MongoClient } = require("mongodb");
const dbConfig = require("../config/db.config.js");

async function connectToDatabase() {
  const client = new MongoClient(dbConfig.URL, { useNewUrlParser: true });

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
