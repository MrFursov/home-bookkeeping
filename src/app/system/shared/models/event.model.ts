export class MyEvent {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public description: string,
    public date: string,
    public categoryName?: string,
    public id?: number
  ) { }
}
