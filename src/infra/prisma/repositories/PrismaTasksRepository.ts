import { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import { TasksRepository } from "@application/repositories/TasksRepository";
import { CreateTaskRequest } from "@application/useCases/CreateTask/dtos/CreateTaskRequest";
import { Task } from "@domain/entities/Task";
import { prisma } from "@infra/prisma";

class PrismaTasksRepository implements TasksRepository {
  async create(dto: CreateTaskRequest): Promise<Task> {
    const task = Task.create({
      ...dto,
      state: "todo",
    });

    await prisma.tasks.create({
      data: {
        ...task.props,
        id: task.id,
        createdAt: task.props.createdAt || new Date(),
        updatedAt: task.props.createdAt || new Date(),
      },
    });

    return task;
  }

  async find(): Promise<Task[]> {
    const tasks = await prisma.tasks.findMany();
    return tasks.map((task) => {
      const newTask = Task.create(task, task.id);
      return newTask;
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.tasks.findUnique({
      where: {
        id,
      },
    });
    if (!task) return null;
    return Task.create(task, task.id);
  }

  async update(dto: UpdateTaskDTO): Promise<Task | null> {
    const task = await prisma.tasks.update({
      data: {
        description: dto.description,
        state: dto.state,
        targetDate: dto.targetDate,
        title: dto.title,
        updatedAt: new Date(),
      },
      where: {
        id: dto.id,
      },
    });
    return Task.create(task, task.id);
  }

  async delete(id: string): Promise<Task | null> {
    const task = await prisma.tasks.delete({
      where: {
        id,
      },
    });
    return Task.create(task, task.id);
  }
}

export { PrismaTasksRepository };
