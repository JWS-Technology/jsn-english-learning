import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  content: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
  },
  role: {
    type: String,
    default: "JSN Aspirant",
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Testimonial content is required"],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  isActive: {
    type: Boolean,
    default: true, // Allows admin to hide a review without deleting it
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
