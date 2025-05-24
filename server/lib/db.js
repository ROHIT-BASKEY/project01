import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    // It's better to attach event listeners outside the try block and only once
    mongoose.connection.on("connected", () =>
      console.log("✅ Database connected")
    );

    mongoose.connection.on("error", (err) =>
      console.error("❌ MongoDB connection error:", err)
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // optional: stop the process if DB connection fails
  }
};
