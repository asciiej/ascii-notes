import { AppError } from "@errors/AppError";
import { Task } from "@domain/entities/Task";
import { InMemoryTasksRepository } from "@tests/repositories/InMemoryTasksRepository";
import { UpdateTask } from "@application/useCases/UpdateTask";
import { randomUUID } from "crypto";

// system under test (sut)
let sut: UpdateTask;

// dependencies
let tasksRepository: InMemoryTasksRepository;
let task: Task;

describe("UpdateTask useCase", () => {
  beforeAll(async () => {
    // dependencies instantiation
    tasksRepository = new InMemoryTasksRepository();
    task = await tasksRepository.create({
      description: "task test",
      targetDate: new Date(),
      title: "test task",
    });

    // sut instantiation
    sut = new UpdateTask(tasksRepository);
  });

  it("should be able to update a task", async () => {
    const response = await sut.execute({
      id: task.id,
      title: "updated task",
    });
    expect(response).toBeTruthy();
    expect(response.title).toBe("updated task");
  });

  it("should not be able to update a task if does not exist", async () => {
    await expect(
      sut.execute({
        id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
