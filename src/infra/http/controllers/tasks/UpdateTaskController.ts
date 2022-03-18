import { TasksRepository } from "@application/repositories/TasksRepository";
import { Request, Response } from "express";
import { UpdateTask } from "@application/useCases/UpdateTask";
import { PrismaTasksRepository } from "@infra/prisma/repositories/PrismaTasksRepository";

const taskRepository: TasksRepository = new PrismaTasksRepository();

class UpdateTaskController {
  async execute(req: Request, res: Response) {
    const id = req.params.id;
    const { description, targetDate, title } = req.body;
    const service = new UpdateTask(taskRepository);
    return res.json(
      await service.execute({
        id,
        description,
        targetDate,
        title,
      })
    );
  }
}

export { UpdateTaskController };
