interface CreateTaskResponse {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly targetDate: Date;
}

export { CreateTaskResponse };
