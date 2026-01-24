import mongoose, { Schema } from "mongoose";

const MaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      index: true, // Faster searching by title
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
      trim: true,
      index: true,
    },
    examType: {
      type: String,
      enum: {
        values: ["TRB", "NET", "SET"],
        message: "{VALUE} is not a supported exam type",
      },
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price in Rupees"],
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
    },
    description: {
      type: String,
      trim: true,
      default: "Comprehensive study material for competitive English exams.",
    },
    pdfKey: {
      type: String,
      required: true,
      unique: true, // Prevents duplicate S3 keys
    },
    fileSize: {
      type: String, // e.g., "2.4 MB"
      default: "Unknown",
    },
    totalPages: {
      type: Number,
      required: [true, "Please provide the total page count"],
      min: [1, "Material must have at least 1 page"],
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

MaterialSchema.virtual("formattedPrice").get(function () {
  return `₹${this.price}`;
});

MaterialSchema.index({ title: "text", subject: "text" });

export default mongoose.models.Material ||
  mongoose.model("Material", MaterialSchema);
