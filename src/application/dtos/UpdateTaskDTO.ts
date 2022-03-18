interface UpdateTaskDTO {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly targetDate?: Date;
  readonly state?: string;
}

export { UpdateTaskDTO };
