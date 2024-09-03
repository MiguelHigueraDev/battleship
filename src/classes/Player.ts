export class Player {
  private id: string

  constructor() {
    this.id = crypto.randomUUID()
  }
}
