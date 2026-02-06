import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  message: string;
  mobile: number;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: [true, "Name is required"] },
    mobile: { type: Number, required: [true, "Number is required"] },
    message: { type: String, required: [true, "message is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", InquirySchema);
