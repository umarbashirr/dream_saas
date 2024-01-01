import { Response } from "express";
import Task from "../../models/task-management/task.model";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const getAllTasks = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const projectId = req.query.projectId;

  const tasks = await Task.find({
    projectId,
    $or: [{ assignedTo: userId }, { createdBy: userId }],
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  return res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully", tasks));
});

const getTaskById = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const taskId = req.params.id;

  const task = await Task.findOne({
    _id: taskId,
    $or: [{ assignedTo: userId }, { createdBy: userId }],
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully", task));
});

const createTask = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const {
    title,
    description,
    dueDate,
    priority,
    status,
    assignedTo,
    projectId,
    tags,
  } = req.body;

  const newTask = new Task({
    title,
    description,
    dueDate,
    priority,
    status,
    assignedTo,
    projectId,
    tags,
    createdBy: userId,
  });

  await newTask.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Task created successfully", newTask));
});

const updateTask = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const taskId = req.params.id;

  const {
    title,
    description,
    dueDate,
    priority,
    status,
    assignedTo,
    projectId,
    tags,
  } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: taskId,
      $or: [{ assignedTo: userId }, { createdBy: userId }],
    },
    {
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      projectId,
      tags,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated successfully", updatedTask));
});

const deleteTask = asyncHandler(async (req: any, res: Response) => {
  const userId = req?.user?._id;
  const taskId = req.params.id;

  const deleteTask = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });

  if (!deleteTask) {
    throw new Error("Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task deleted successfully", deleteTask));
});

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
