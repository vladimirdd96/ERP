export class Project {
  public contributors: string[];
  public id: number;
  public userId: number;
  constructor(public name: string, public description: string, public pmRatePerHour) {
    this.name = name;
    this.description = description;
    this.pmRatePerHour = pmRatePerHour;
    this.contributors = [];
  }
}
