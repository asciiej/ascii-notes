import { randomUUID } from 'crypto';
import { UpdateTaskDTO } from '@application/dtos/UpdateTaskDTO';
import { TasksRepository } from '@application/repositories/TasksRepository';
import { CreateTaskRequest } from '@application/useCases/CreateTask/dtos/CreateTaskRequest';
import { Task } from '@domain/entities/Task';
import { Schema, model as Model} from 'mongoose';
import { mongooseInit } from '@infra/mongoose';

type MongoTask = Task & { _id: string}; 

const schema = new Schema<MongoTask>({
  _id: { type: String, default: randomUUID()},
  description: { type: String, required: true},
  title: { type: String, required: true},
  targetDate: { type: Date, required: true},
  state: { type: String, default: 'todo'},
});

const TaskModel = Model<MongoTask>('task', schema);

class MongooseTasksRepository implements TasksRepository {

  constructor () {
    (async () => {
      await mongooseInit();
    })();
  }

  public async create(dto: CreateTaskRequest): Promise<Task> {
    const task = Task.create({
      ...dto,
      state: 'todo'
    });

    const mongoTask = new TaskModel({
      ...task,
      description: task.description,
      title: task.title,
      targetDate: task.targetDate,
      _id: task.id
    });

    await mongoTask.save();
    
    return task;
  }
  
  public async find(): Promise<Task[]> {
    const mongoTasks = await TaskModel.find();
    return mongoTasks;
  }
  
  public async findById(id: string): Promise<Task | null> {
    const mongoTask = await TaskModel.findById(id);
    return mongoTask;
  }
  
  public async update(dto: UpdateTaskDTO): Promise<Task | null> {
    console.log('updating...');
    const mongoTask = await TaskModel.updateOne({
      id: dto.id,
    },{
      $push: dto,
    });
    console.log(":::::: ",mongoTask);

    if(mongoTask.modifiedCount === 1) 
      return Task.create({
        description: dto.description || '<not modified>',
        title: dto.title || '<not modified>',
        state: dto.state || '<not modified>',
        targetDate: dto.targetDate || new Date(),
      });

    return null;
  }
  
  public async delete(id: string): Promise<Task | null> {
    await TaskModel.deleteOne({
      id
    });
    return null;
  }
}

export { MongooseTasksRepository };