interface UpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  targetDate?: Date;
};

export { UpdateTaskRequest };