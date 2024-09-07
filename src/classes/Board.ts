import type { Coordinates } from '@/types/Coordinates'
import type { Ship } from './Ship'
import { Fleet } from './Fleet'
import type { Orientation } from '@/types/Orientation'

export class Board {
  private placedShips: (Ship | undefined)[][]
  private size: number
  private fleet: Fleet

  constructor(size: number = 10) {
    this.placedShips = Array.from({ length: size }, () => Array.from({ length: size }))
    this.size = size
    this.fleet = new Fleet()
  }

  public getPlacedShips(): (Ship | undefined)[][] {
    return this.placedShips
  }

  public getFleet(): Fleet {
    return this.fleet
  }

  public setFleet(fleet: Fleet): void {
    this.fleet = fleet
  }

  public getSize(): number {
    return this.size
  }

  public receiveAttack(coordinates: Coordinates): void {
    const ship = this.placedShips[coordinates.y][coordinates.x]
    if (ship) {
      ship.hit()
    }
  }

  public placeShip(ship: Ship, coords: Coordinates, orientation: Orientation): void {
    if (!this.checkBounds(coords, ship.getMaxHitpoints(), orientation)) {
      throw new Error('Ship out of bounds')
    }

    if (!this.checkAlreadyPlaced(coords, ship.getMaxHitpoints(), orientation)) {
      throw new Error('Ship already placed in this area')
    }

    if (orientation === 'horizontal') {
      for (let i = 0; i < ship.getMaxHitpoints(); i++) {
        this.placedShips[coords.y][coords.x + i] = ship
      }
    } else {
      for (let i = 0; i < ship.getMaxHitpoints(); i++) {
        this.placedShips[coords.y + i][coords.x] = ship
      }
    }
  }

  public removeShip(ship: Ship): void {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.placedShips[y][x] === ship) {
          this.placedShips[y][x] = undefined
        }
      }
    }
  }

  private checkBounds(coords: Coordinates, shipLength: number, orientation: Orientation): boolean {
    if (coords.x < 0 || coords.x >= this.size || coords.y < 0 || coords.y >= this.size) return false
    if (orientation === 'horizontal') {
      if (coords.x + shipLength > this.size) return false
    } else {
      if (coords.y + shipLength > this.size) return false
    }
    return true
  }

  private checkAlreadyPlaced(coords: Coordinates, shipLength: number, orientation: Orientation): boolean {
    if (orientation === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        if (this.placedShips[coords.y][coords.x + i] !== undefined) return false
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        if (this.placedShips[coords.y + i][coords.x] !== undefined) return false
      }
    }
    return true
  }
}
