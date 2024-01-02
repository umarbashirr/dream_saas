import { Response } from "express";
import Tag from "../../models/task-management/tag.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

const getAllTags = asyncHandler(async (req: any, res: Response) => {
  const tags = await Tag.find({ createdBy: req.user._id });
  res.status(200).json(new ApiResponse(200, "success", tags));
});

const getTagById = asyncHandler(async (req: any, res: Response) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    throw new ApiError(404, "Tag not found");
  }

  res.status(200).json(new ApiResponse(200, "success", tag));
});

const createTag = asyncHandler(async (req: any, res: Response) => {
  const { name, color } = req.body;

  if (!name || !color) {
    throw new ApiError(400, "Name and color are required");
  }

  const tag = new Tag({
    name,
    color,
    createdBy: req.user._id,
  });

  await tag.save();

  res.status(201).json(new ApiResponse(201, "success", tag));
});

const updateTag = asyncHandler(async (req: any, res: Response) => {
  const { name, color } = req.body;

  if (!name || !color) {
    throw new ApiError(400, "Name and color are required");
  }

  const tag = await Tag.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        color,
      },
    },
    { new: true }
  );

  if (!tag) {
    throw new ApiError(404, "Tag not found");
  }

  res.status(200).json(new ApiResponse(200, "success", tag));
});

const deleteTag = asyncHandler(async (req: any, res: Response) => {
  const tagId = req.params.id;

  const deletedTag = Tag.findByIdAndDelete(tagId);

  if (!deletedTag) {
    throw new ApiError(404, "Tag not found");
  }

  res.status(200).json(new ApiResponse(200, "success", deletedTag));
});

export { getAllTags, getTagById, createTag, updateTag, deleteTag };
