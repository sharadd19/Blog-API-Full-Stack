//// mongoConfigTesting.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

async function connectDB() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}

async function clearDB() {
  try {
    const collections = mongoose.connection.collections;
    const clearPromises = Object.values(collections).map((collection) =>
      collection.deleteMany({})
    );
    await Promise.all(clearPromises);
    console.log("All collections cleared");
  } catch (error) {
    console.error("Error clearing collections:", error);
    throw error;
  }
}

async function closeDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}
module.exports = { connectDB, clearDB, closeDB };
