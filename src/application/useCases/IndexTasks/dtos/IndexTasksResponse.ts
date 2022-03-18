interface IndexTasksResponse {
  tasks: {
    id: string;
    title: string;
    description: string;
    state: string;
    targetDate: Date;
  }[];
}

export { IndexTasksResponse };
