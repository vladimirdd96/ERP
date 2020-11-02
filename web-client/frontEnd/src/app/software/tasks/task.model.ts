export class Task {
  public userId: number;
  public id: number;
  constructor(
    public name: string,
    public description: string,
    public status: string,
    public projectId: number,
    public devId: number
  ) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.projectId = projectId;
    this.devId = devId;
  }
}
