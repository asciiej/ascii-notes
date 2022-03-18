import { AppError } from "@errors/AppError";
import { randomUUID } from "crypto";
import { InMemoryTasksRepository } from "@tests/repositories/InMemoryTasksRepository";
import { DeleteTask } from "@application/useCases/DeleteTask";

// system under test (sut)
let sut: DeleteTask;

// dependencies
let tasksRepository: InMemoryTasksRepository;

describe("DeleteTask useCase", () => {
  beforeAll(async () => {
    // dependencies instantiation
    tasksRepository = new InMemoryTasksRepository();

    // sut instantiation
    sut = new DeleteTask(tasksRepository);
  });

  it("should be able to delete task", async () => {
    const task = await tasksRepository.create({
      description: "test task",
      targetDate: new Date(),
      title: "test task",
    });
    const response = await sut.execute({ id: task.id });
    expect(response).toBeTruthy();
    expect(response.id).toBe(task.id);
  });

  it("should not be able to delete task if its does not exist", async () => {
    await expect(sut.execute({ id: randomUUID() })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
