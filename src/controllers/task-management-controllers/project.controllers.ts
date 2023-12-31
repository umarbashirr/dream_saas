import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

const getAllProjects = asyncHandler(async (req: any, res: Response) => {});

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
