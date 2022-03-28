import { TasksRepository } from "@application/repositories/TasksRepository";
import { Request, Response } from "express";
import { IndexTasks } from "@application/useCases/IndexTasks";
import { PrismaTasksRepository } from "@infra/prisma/repositories/PrismaTasksRepository";
import { MongooseTasksRepository } from "@infra/mongoose/MongooseTasksRepository";

const taskRepository: TasksRepository = new PrismaTasksRepository();
// const taskRepository: TasksRepository = new MongooseTasksRepository();

class IndexTasksController {
  async execute(_req: Request, res: Response) {
    const service = new IndexTasks(taskRepository);
    return res.json(await service.execute());
  }
}

export { IndexTasksController };
