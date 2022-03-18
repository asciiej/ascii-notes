import { TasksRepository } from "@application/repositories/TasksRepository";
import { CreateTaskRequest } from "./dtos/CreateTaskRequest";
import { CreateTaskResponse } from "./dtos/CreateTaskResponse";

class CreateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    title,
    description,
    targetDate,
  }: CreateTaskRequest): Promise<CreateTaskResponse> {
    // criar nova tarefa
    const task = await this.tasksRepository.create({
      description,
      targetDate,
      title,
    });

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      targetDate: task.targetDate,
    };
  }
}

export { CreateTask };
