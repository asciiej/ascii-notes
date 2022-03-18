import { Entity } from "@core/domain/Entity";
import { TaskProps } from "@domain/interfaces/TaskProps";

class Task extends Entity<TaskProps> {
  private constructor(props: TaskProps, id?: string) {
    super(props, id);
  }

  static create(props: TaskProps, id?: string) {
    const task = new Task({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id);

    return task;
  }

  get title() { 
    return this.props.title; 
  }

  get description() { 
    return this.props.description; 
  }

  get targetDate() { 
    return this.props.targetDate; 
  }

  get state() {
    return this.props.state;
  }
  
}

export { Task };