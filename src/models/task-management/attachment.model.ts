import { Schema, model } from "mongoose";

const AttachmentSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: String },
  deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Attachment = model("Attachment", AttachmentSchema);

export default Attachment;
