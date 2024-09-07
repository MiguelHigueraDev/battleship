import { ShipType } from '@/types/ShipType'
import { Ship } from './Ship'

export class Fleet {
  private ships: Ship[]

  constructor(ships?: Ship[]) {
    if (ships) {
      this.ships = ships
    } else {
      this.ships = [
        new Ship(ShipType.CARRIER),
        new Ship(ShipType.BATTLESHIP),
        new Ship(ShipType.CRUISER),
        new Ship(ShipType.DESTROYER),
        new Ship(ShipType.SUBMARINE)
      ]
    }
  }

  public getShips(): Ship[] {
    return this.ships
  }

  public addShip(ship: Ship): void {
    this.ships.push(ship)
  }

  public removeShip(ship: Ship): void {
    this.ships = this.ships.filter((fleetShip) => fleetShip.getId() !== ship.getId())
  }

  public isDestroyed(): boolean {
    return this.ships.every((ship) => ship.isDestroyed())
  }
}
