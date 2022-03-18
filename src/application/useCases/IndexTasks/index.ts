import { TasksRepository } from "@application/repositories/TasksRepository";
import { IndexTasksResponse } from "./dtos/IndexTasksResponse";

class IndexTasks {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<IndexTasksResponse> {
    const tasks = await this.tasksRepository.find();
    return { tasks };
  }
}

export { IndexTasks };
