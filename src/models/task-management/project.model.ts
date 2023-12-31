import { Schema, model } from "mongoose";

export interface IProject {
  name: string;
  description: string;
  tasks: string[];
  members: string[];
  owner: string;
  isDeleted: boolean;
  deletedAt: string;
  deletedBy: string;
}

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: String },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Project = model<IProject>("Project", ProjectSchema);

export default Project;
