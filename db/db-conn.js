import mongoose from "mongoose";

export const mongooseConn = mongoose.connect(
  process.env.DB_URI, {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongooose connection error: "));
db.once("open", () => {
  console.log("Mongoose connection successful!");
});

export const petSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
    required: true,
  },
  petName: {
    type: String,
    required: true
  },
  petPhotoSrc: {
    type: String,
    required: false
  },
  petId: {
    type: String,
    required: true
  }
});

// Create index for the schema
petSchema.index({ '$**': 'text' });

export const Pets = mongoose.model("Favourite_pets", petSchema);