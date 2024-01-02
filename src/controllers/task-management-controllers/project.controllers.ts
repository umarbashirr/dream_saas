import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import Project from "../../models/task-management/project.model";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

const getAllProjects = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;

  const projects = await Project.find({
    $or: [{ owner: userId }, { members: userId }],
    isDeleted: false,
  })
    .populate("owner", "name email")
    .populate("members", "name email");

  res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", projects));
});

const getProjectById = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const projectId = req.params.id;

  const project = await Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { members: userId }],
    isDeleted: false,
  })
    .populate("owner", "name email")
    .populate("members", "name email");

  res
    .status(200)
    .json(new ApiResponse(200, "Project fetched successfully", project));
});

const createProject = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const { name, description } = req.body;

  if (!name.trim()) {
    throw new ApiError(400, "Project name is required");
  }

  const newProject = new Project({
    name,
    description,
    owner: userId,
  });

  await newProject.save();

  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", newProject));
});

const updateProject = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const projectId = req.params.id;

  const { name, description } = req.body;

  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: userId,
      isDeleted: false,
    },
    {
      name,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProject) {
    throw new ApiError(404, "Project not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", updatedProject));
});

const deleteProject = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const projectId = req.params.id;

  const deletedProject = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: userId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
      deletedBy: userId,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!deletedProject) {
    throw new ApiError(404, "Project not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Project deleted successfully", deletedProject));
});

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
