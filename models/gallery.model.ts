import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  mediaUrl: string; // S3 Link
  mediaType: "image" | "video" | "screenshot";
  isActive: boolean;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  title: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  mediaType: {
    type: String,
    enum: ["image", "video", "screenshot"],
    required: true,
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Gallery ||
  mongoose.model<IGallery>("Gallery", GallerySchema);
