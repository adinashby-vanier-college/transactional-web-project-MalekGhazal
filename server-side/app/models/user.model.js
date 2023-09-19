//const { json } = require("express");
const connectToDatabase = require("../utils/dbConnect");
const dbConfig = require("../config/db.config.js");

//constructor;
const User = function (user) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

const collectionName = "user";

User.getAll = async (title, result) => {
  const client = await connectToDatabase();
  if (!client) {
    console.error("Database connection failed.");
    return;
  }

  const collection = client.db(dbConfig.dbName).collection(collectionName);

  // const findQuery = { prepTimeInMinutes: { $lt: 45 } };//selection condition
  const findQuery = {};
  try {
    //  const cursor = await collection.find(findQuery).sort({ name: 1 });
    const res = await collection.find(findQuery).toArray();

    result(null, res);
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
    result(null, err);
  } finally {
    client.close();
  }
};
module.exports = User;
