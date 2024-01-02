import Comment from "../../models/task-management/comment.model";
import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";

// Create a new comment
export const createComment = asyncHandler(async (req: any, res: Response) => {
  const { description, taskId } = req.body;

  if (!description || !taskId) {
    throw new ApiError(400, "Please provide description and taskId");
  }

  const comment = new Comment({
    description,
    taskId,
    commentedBy: req.user._id,
  });
  await comment.save();
  return res.status(201).json(new ApiResponse(201, "success", comment));
});

// Get all comments for a task

export const getAllCommentsForTask = asyncHandler(
  async (req: any, res: Response) => {
    const { taskId } = req.query;
    const comments = await Comment.find({ taskId }).populate(
      "commentedBy",
      "-password -refreshToken -__v -createdAt -updatedAt"
    );
    return res.status(200).json(new ApiResponse(200, "success", comments));
  }
);

// Delete a comment

export const deleteComment = asyncHandler(async (req: any, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  const comment: any = await Comment.findById(commentId).populate("taskId");

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  console.log(
    comment?.commentedBy.toString(),
    userId.toString(),
    comment?.taskId?.createdBy.toString()
  );

  if (
    comment?.commentedBy.toString() === userId.toString() ||
    comment?.taskId?.createdBy.toString() === userId.toString()
  ) {
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json(new ApiResponse(200, "success", {}));
  } else {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }
});

// Update a comment
export const updateComment = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user._id;
  const { commentId } = req.params;
  const { description } = req.body;

  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      commentedBy: userId,
    },
    {
      $set: {
        description,
      },
    },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res.status(200).json(new ApiResponse(200, "success", updatedComment));
});
