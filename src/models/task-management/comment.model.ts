import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    description: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    commentedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
