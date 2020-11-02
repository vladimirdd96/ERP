export class UserFinancialReport {
  private _workingHours: number;
  public profit: number;
  public loss: number;
  constructor(
    public ratePerHour: number,
    public paycheckPerHour: number,
    public reportDayCount: number,
    workingHours: number,
  ) 
  {
    this.ratePerHour = ratePerHour,
    this._workingHours = workingHours,
    this.paycheckPerHour = paycheckPerHour,
    this.profit = ratePerHour * workingHours,
    this.loss = paycheckPerHour * reportDayCount;
  }

  get workingHours(): number {
    return this._workingHours;
  }

  set workingHours(workingHours: number) {
    this._workingHours = workingHours;
    this.profit = this._workingHours * this.ratePerHour;
    this.loss = this.reportDayCount * this.paycheckPerHour * 8;
  }
}
