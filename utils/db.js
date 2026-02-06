const mongoose = require("mongoose");

function connectDB(uri) {
  if (!uri) {
    console.error("❌ MongoDB URI is missing");
    process.exit(1);
  }

  return mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((e) => {
      console.error("❌ MongoDB error:", e);
      process.exit(1);
    });
}

module.exports = { connectDB };
