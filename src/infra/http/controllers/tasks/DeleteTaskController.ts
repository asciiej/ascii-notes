import { TasksRepository } from "@application/repositories/TasksRepository";
import { Request, Response } from "express";
import { DeleteTask } from "@application/useCases/DeleteTask";
import { PrismaTasksRepository } from "@infra/prisma/repositories/PrismaTasksRepository";

const taskRepository: TasksRepository = new PrismaTasksRepository();

class DeleteTaskController {
  async execute(req: Request, res: Response) {
    const id = req.params.id;
    const service = new DeleteTask(taskRepository);
    return res.json(
      await service.execute({
        id,
      })
    );
  }
}

export { DeleteTaskController };
