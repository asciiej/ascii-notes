import { InMemoryTasksRepository } from "@tests/repositories/InMemoryTasksRepository";
import { IndexTasks } from "@application/useCases/IndexTasks";

// system under test (sut)
let sut: IndexTasks;

// dependencies
let tasksRepository: InMemoryTasksRepository;

describe("IndexTasks useCase", () => {
  beforeAll(async () => {
    // dependencies instantiation
    tasksRepository = new InMemoryTasksRepository();

    // sut instantiation
    sut = new IndexTasks(tasksRepository);
  });

  it("should be able to index all tasks", async () => {
    await tasksRepository.create({
      description: "test 1",
      targetDate: new Date(),
      title: "test 1",
    });
    await tasksRepository.create({
      description: "test 2",
      targetDate: new Date(),
      title: "test 2",
    });
    const response = await sut.execute();
    expect(response).toBeTruthy();
    expect(response.tasks).toBeTruthy();
    expect(response.tasks.length).toBe(2);
  });
});
