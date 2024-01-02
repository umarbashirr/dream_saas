import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/task-management-routes/project.routes";
import taskRoutes from "./routes/task-management-routes/task.routes";
import tagRoutes from "./routes/task-management-routes/tag.routes";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/tags", tagRoutes);

export { app };
