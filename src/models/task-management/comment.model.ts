import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    description: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
