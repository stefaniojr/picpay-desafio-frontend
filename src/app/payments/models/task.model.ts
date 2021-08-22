export class Task {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public title: string,
    public value: number,
    public date: string,
    public image: string,
    public isPayed: boolean
  ) {}
}
