import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  meetingCode: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

});

const Meeting = mongoose.model("Meeting", userSchema);
export { Meeting };
