import { AppError } from "@errors/AppError";
import { TasksRepository } from "@application/repositories/TasksRepository";
import { DeleteTaskRequest } from "./dtos/DeleteTaskRequest";
import { DeleteTaskResponse } from "./dtos/DeleteTaskResponse";

class DeleteTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    // verificar se a task existe
    let task = await this.tasksRepository.findById(id);
    if (!task) throw new AppError("task not found");

    // apagar task
    task = await this.tasksRepository.delete(id);
    if (!task) throw new AppError("unable to remove task", 500);

    return {
      id: task.id,
      description: task.description,
      state: task.state,
      targetDate: task.targetDate,
      title: task.title,
    };
  }
}

export { DeleteTask };
