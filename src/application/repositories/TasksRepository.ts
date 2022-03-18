import { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import { CreateTaskRequest } from "@application/useCases/CreateTask/dtos/CreateTaskRequest";
import { Task } from "@domain/entities/Task";

interface TasksRepository {
  create(dto: CreateTaskRequest): Promise<Task>;
  find(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(dto: UpdateTaskDTO): Promise<Task | null>;
  delete(id: string): Promise<Task | null>;
}

export { TasksRepository };
