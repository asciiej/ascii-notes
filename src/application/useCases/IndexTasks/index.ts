import { TasksRepository } from "@application/repositories/TasksRepository";
import { IndexTasksResponse } from "./dtos/IndexTasksResponse";

class IndexTasks {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<IndexTasksResponse> {
    const tasks = await this.tasksRepository.find();
    return {
      tasks: tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          state: task.state,
          targetDate: task.targetDate,
        };
      }),
    };
  }
}

export { IndexTasks };
