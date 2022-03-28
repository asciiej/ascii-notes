import { TasksRepository } from "@application/repositories/TasksRepository";
import { Request, Response } from "express";
import { ChangeTaskState } from "@application/useCases/ChangeTaskState";
import { PrismaTasksRepository } from "@infra/prisma/repositories/PrismaTasksRepository";
import { MongooseTasksRepository } from "@infra/mongoose/MongooseTasksRepository";

const taskRepository: TasksRepository = new PrismaTasksRepository();
// const taskRepository: TasksRepository = new MongooseTasksRepository();

class ChangeTaskStateController {
  async execute(req: Request, res: Response) {
    const id = req.params.id;
    const service = new ChangeTaskState(taskRepository);
    return res.json(
      await service.execute({
        id,
      })
    );
  }
}

export { ChangeTaskStateController };
