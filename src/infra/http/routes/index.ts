import { Router } from "express";
import { tasksRoutes } from "./tasks.routes";

const appRoutes = Router();

appRoutes.use(tasksRoutes);

export { appRoutes };
