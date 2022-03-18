import { TasksRepository } from "@application/repositories/TasksRepository";
import { CreateTask } from "@application/useCases/CreateTask";
import { Request, Response } from "express";
import { PrismaTasksRepository } from "@infra/prisma/repositories/PrismaTasksRepository";

const taskRepository: TasksRepository = new PrismaTasksRepository();

class CreateTaskController {
  async execute(req: Request, res: Response) {
    const { description, title, targetDate } = req.body;
    const service = new CreateTask(taskRepository);
    return res.json(
      await service.execute({
        description,
        title,
        targetDate,
      })
    );
  }
}

export { CreateTaskController };
