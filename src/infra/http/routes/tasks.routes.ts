import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";
import { CreateTaskController } from "@infra/http/controllers/tasks/CreateTaskController";
import { IndexTasksController } from "@infra/http/controllers/tasks/IndexTasksController";
import { UpdateTaskController } from "@infra/http/controllers/tasks/UpdateTaskController";
import { ChangeTaskStateController } from "@infra/http/controllers/tasks/ChangeTaskStateController";
import { DeleteTaskController } from "@infra/http/controllers/tasks/DeleteTaskController";

const createBodyMask = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  targetDate: Joi.date().required(),
};

const updateBodyMask = {
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  targetDate: Joi.date().optional(),
  state: Joi.string().optional(),
};

const updateParamsMask = {
  id: Joi.string().uuid().required(),
};

const changeTaskStateParamsMask = {
  id: Joi.string().uuid().required(),
};

const deleteTaskParamsMask = {
  id: Joi.string().uuid().required(),
};

const tasksRoutes = Router();

// controllers
const createTaskController = new CreateTaskController();
const indexTasksController = new IndexTasksController();
const updateTaskController = new UpdateTaskController();
const changeTaskStateController = new ChangeTaskStateController();
const deleteTaskController = new DeleteTaskController();

// create
tasksRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: createBodyMask,
  }),
  createTaskController.execute
);

// read
tasksRoutes.get("/", indexTasksController.execute);

// update
tasksRoutes.put(
  "/:id",
  celebrate({
    [Segments.BODY]: updateBodyMask,
    [Segments.PARAMS]: updateParamsMask,
  }),
  updateTaskController.execute
);

// change state
tasksRoutes.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: changeTaskStateParamsMask,
  }),
  changeTaskStateController.execute
);

// delete
tasksRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: deleteTaskParamsMask,
  }),
  deleteTaskController.execute
);

export { tasksRoutes };
