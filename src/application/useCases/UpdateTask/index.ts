import { TasksRepository } from "@application/repositories/TasksRepository";
import { AppError } from "@errors/AppError";
import { UpdateTaskRequest } from "./dtos/UpdateTaskRequest";
import { UpdateTaskResponse } from "./dtos/UpdateTaskResponse";

class UpdateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
    description,
    targetDate,
    title,
  }: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    // verificar se a task exist
    let task = await this.tasksRepository.findById(id);
    if (!task) throw new AppError("task not found", 404);

    // atualizar a task
    task = await this.tasksRepository.update({
      id,
      description,
      targetDate,
      title,
    });
    if (!task) throw new AppError("unable to update task", 500);

    return {
      id: task.id,
      description: task.description,
      targetDate: task.targetDate,
      title: task.title,
    };
  }
}

export { UpdateTask };
