import { CreateTask } from "@application/useCases/CreateTask";
import { InMemoryTasksRepository } from "@tests/repositories/InMemoryTasksRepository";

// system under test (sut)
let sut: CreateTask;

// dependencies
let tasksRepository: InMemoryTasksRepository;

describe("CreateTask useCase", () => {
  beforeAll(async () => {
    // dependencies instanciation
    tasksRepository = new InMemoryTasksRepository();

    // sut instantiation
    sut = new CreateTask(tasksRepository);
  });

  it("should be able to create a task", async () => {
    const response = await sut.execute({
      description: "test description",
      targetDate: new Date(),
      title: "test",
    });
    expect(response).toBeTruthy();
    expect(response.id !== undefined).toBe(true);
  });
});
