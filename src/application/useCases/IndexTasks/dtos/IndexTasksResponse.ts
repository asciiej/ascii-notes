interface IndexTasksResponse {
  tasks: {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly state: string;
    readonly targetDate: Date;
  }[];
}

export { IndexTasksResponse };
