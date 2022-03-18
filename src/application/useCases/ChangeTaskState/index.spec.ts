import { randomUUID } from "crypto";
import { AppError } from "@errors/AppError";
import { InMemoryTasksRepository } from "@tests/repositories/InMemoryTasksRepository";
import { ChangeTaskState } from "@application/useCases/ChangeTaskState";
import { Task } from "@domain/entities/Task";

// system under test (sut)
let sut: ChangeTaskState;

// dependencies
let tasksRepository: InMemoryTasksRepository;

describe("ChangeTaskState useCase", () => {
  beforeAll(async () => {
    // dependencies instantiation
    tasksRepository = new InMemoryTasksRepository();

    // sut instantiation
    sut = new ChangeTaskState(tasksRepository);
  });

  it("should be able to change task state from 'todo' to 'doing'", async () => {
    const task = await tasksRepository.create({
      description: "test description",
      targetDate: new Date(),
      title: "test",
    });
    const response = await sut.execute({ id: task.id });
    expect(response).toBeTruthy();
    expect(response.state).toBe("doing");
  });

  it("should be able to change task state from 'doing' to 'done'", async () => {
    const task = await tasksRepository.create({
      description: "test description",
      targetDate: new Date(),
      title: "test",
    });
    await tasksRepository.update({ id: task.id, state: "doing" });
    const response = await sut.execute({ id: task.id });
    expect(response).toBeTruthy();
    expect(response.state).toBe("done");
  });

  it("should not be able to change task if does not exist", async () => {
    await expect(sut.execute({ id: randomUUID() })).rejects.toBeInstanceOf(
      AppError
    );
  });
  it("should not be able to change task state if its 'done'", async () => {
    const task = await tasksRepository.create({
      description: "test description",
      targetDate: new Date(),
      title: "test",
    });
    await tasksRepository.update({ id: task.id, state: "done" });
    await expect(sut.execute({ id: task.id })).rejects.toBeInstanceOf(AppError);
  });
});
