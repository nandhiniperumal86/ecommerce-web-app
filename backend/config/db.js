import mongoose from 'mongoose';

/**
 * @desc Connect to MongoDB Atlas
 * @usage Called in server.js
 */
const connectDB = async () => {
  try {
    // Connect using connection string from .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
