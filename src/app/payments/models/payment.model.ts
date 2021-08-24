export class Payment {
  constructor(
    public id: number = 0,
    public name: string = "",
    public username: string = "",
    public title: string = "",
    public value: number = 0,
    public date: string = "",
    public image: string = "",
    public isPayed: boolean = false
  ) {}
}
