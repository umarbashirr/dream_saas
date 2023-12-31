import { Schema, model } from "mongoose";

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: String },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Tag = model("Tag", TagSchema);

export default Tag;
