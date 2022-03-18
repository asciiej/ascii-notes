import { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import { TasksRepository } from "@application/repositories/TasksRepository";
import { CreateTaskRequest } from "@application/useCases/CreateTask/dtos/CreateTaskRequest";
import { Task } from "@domain/entities/Task";

class InMemoryTasksRepository implements TasksRepository {
  private tasks: Task[] = [];
  async create(dto: CreateTaskRequest): Promise<Task> {
    const task = Task.create({
      ...dto,
      state: "todo",
    });
    this.tasks.push(task);
    return task;
  }

  async find(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null;
  }

  async update(dto: UpdateTaskDTO): Promise<Task | null> {
    const index = this.tasks.findIndex((task) => task.id === dto.id);
    const task = Task.create(
      {
        description: dto.description || this.tasks[index].props.description,
        title: dto.title || this.tasks[index].props.title,
        targetDate: dto.targetDate || this.tasks[index].props.targetDate,
        state: dto.state || this.tasks[index].props.state,
      },
      dto.id
    );
    this.tasks[index] = task;
    return task;
  }

  async delete(id: string): Promise<Task | null> {
    const task = this.tasks.find((value) => value.id === id);
    if (!task) return null;
    this.tasks = this.tasks.filter((value) => value.id !== id);
    return task;
  }
}

export { InMemoryTasksRepository };
