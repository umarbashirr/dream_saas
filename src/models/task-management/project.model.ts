import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: String },
  deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Project = model("Project", ProjectSchema);

export default Project;
