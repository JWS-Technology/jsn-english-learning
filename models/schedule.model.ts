import mongoose, { Schema, Document } from "mongoose";

export interface ISchedule extends Document {
  isActive: boolean;
  classFromDate: string;
  classToDate: string;
  classUnit: string;
  testDate: string;
  testUnit: string;
  updatedAt: Date;
}

const ScheduleSchema: Schema = new Schema(
  {
    isActive: { type: Boolean, default: true },
    classFromDate: { type: String, default: "" },
    classToDate: { type: String, default: "" },
    classUnit: { type: String, default: "" },
    testDate: { type: String, default: "" },
    testUnit: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Schedule ||
  mongoose.model<ISchedule>("Schedule", ScheduleSchema);
