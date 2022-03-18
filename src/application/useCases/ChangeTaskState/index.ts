import { AppError } from "@errors/AppError";
import { TasksRepository } from "@application/repositories/TasksRepository";
import { ChangeTaskStateRequest } from "./dtos/ChangeTaskStateRequest";
import { ChangeTaskStateResponse } from "./dtos/ChangeTaskStateResponse";

class ChangeTaskState {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
  }: ChangeTaskStateRequest): Promise<ChangeTaskStateResponse> {
    // verificar se a task existe
    let task = await this.tasksRepository.findById(id);
    if (!task) throw new AppError("task not found", 404);

    // atualizar estado
    if (task.state === "done") throw new AppError("task already done");

    task = await this.tasksRepository.update({
      id,
      state: task.state === "todo" ? "doing" : "done",
    });

    if (!task) throw new AppError("unable to change task state", 500);

    return {
      id: task.id,
      description: task.description,
      state: task.state,
      targetDate: task.targetDate,
      title: task.title,
    };
  }
}

export { ChangeTaskState };
