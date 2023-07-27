export class TodoTask {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;

  constructor(id: number, title: string, description: string, completed: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isComplete = completed;
  }
}