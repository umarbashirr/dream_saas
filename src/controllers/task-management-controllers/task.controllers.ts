import { asyncHandler } from "../../utils/asyncHandler";

const getAllTasks = asyncHandler(async (req: any, res: Response) => {});

const getTaskById = asyncHandler(async (req: any, res: Response) => {});

const createTask = asyncHandler(async (req: any, res: Response) => {});

const updateTask = asyncHandler(async (req: any, res: Response) => {});

const deleteTask = asyncHandler(async (req: any, res: Response) => {});

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
