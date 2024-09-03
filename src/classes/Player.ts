import { Fleet } from './Fleet'
import type { Ship } from './Ship'

export class Player {
  private id: string
  private fleet: Fleet

  constructor() {
    this.id = crypto.randomUUID()
    this.fleet = new Fleet()
  }

  public getId(): string {
    return this.id
  }

  public getFleet(): Fleet {
    return this.fleet
  }

  public addShip(ship: Ship): void {
    this.fleet.addShip(ship)
  }

  public removeShip(ship: Ship): void {
    this.fleet.removeShip(ship)
  }

  public isDefeated(): boolean {
    return this.fleet.isDestroyed()
  }

  public reset(): void {
    this.fleet = new Fleet()
  }
}
