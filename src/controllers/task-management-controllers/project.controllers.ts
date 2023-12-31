import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import Project from "../../models/task-management/project.model";
import { ApiResponse } from "../../utils/ApiResponse";

const getAllProjects = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;

  const projects = await Project.find({ owner: userId });

  res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", projects));
});

const getProjectById = asyncHandler(async (req: any, res: Response) => {});

const createProject = asyncHandler(async (req: any, res: Response) => {});

const updateProject = asyncHandler(async (req: any, res: Response) => {});

const deleteProject = asyncHandler(async (req: any, res: Response) => {});

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
