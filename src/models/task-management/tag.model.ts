import { Schema, model } from "mongoose";

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Tag = model("Tag", TagSchema);

export default Tag;
