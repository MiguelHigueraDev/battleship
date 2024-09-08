import type { Coordinates } from '../../../shared/Coordinates'
import { Board } from './Board'
import { Fleet } from './Fleet'
import type { Ship } from './Ship'

export class Player {
  private id: string
  private board: Board

  constructor() {
    this.id = crypto.randomUUID()
    this.board = new Board()
  }

  public getId(): string {
    return this.id
  }

  public getFleet(): Fleet {
    return this.board.getFleet()
  }

  public getBoard(): Board {
    return this.board
  }

  public addShip(ship: Ship): void {
    this.board.getFleet().addShip(ship)
  }

  public removeShip(ship: Ship): void {
    this.board.getFleet().removeShip(ship)
  }

  public attack(opponent: Player, coordinates: Coordinates): void {
    opponent.receiveAttack(coordinates)
  }

  public receiveAttack(coordinates: Coordinates): void {
    this.board.receiveAttack(coordinates)
  }

  public isDefeated(): boolean {
    return this.board.getFleet().isDestroyed()
  }

  public setDefeated(): void {
    this.board
      .getFleet()
      .getShips()
      .forEach((ship) => ship.destroy())
  }

  public reset(): void {
    this.board.setFleet(new Fleet())
  }
}
