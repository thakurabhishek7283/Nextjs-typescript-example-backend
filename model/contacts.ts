import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  id: { type: String },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Contact", contactSchema);
