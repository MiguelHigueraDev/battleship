import type { Coordinates } from '@/types/Coordinates'
import type { Ship } from './Ship'

export class Board {
  private board: Ship[][]
  private size: number

  constructor(size: number) {
    this.board = Array.from({ length: size }, () => Array.from({ length: size }))
    this.size = size
  }

  public getBoard(): Ship[][] {
    return this.board
  }

  public getSize(): number {
    return this.size
  }

  public placeShip(ship: Ship, coords: Coordinates, orientation: 'horizontal' | 'vertical'): void {
    if (!this.checkBounds(coords, ship.getMaxHitpoints(), orientation)) {
      throw new Error('Ship out of bounds')
    }

    if (orientation === 'horizontal') {
      for (let i = 0; i < ship.getMaxHitpoints(); i++) {
        if (this.checkShipIsPlaced({ x: coords.x + i, y: coords.y })) {
          throw new Error(`Ship already placed at ${coords.x + i}, ${coords.y}`)
        }
        this.board[coords.y][coords.x + i] = ship
      }
    } else {
      for (let i = 0; i < ship.getMaxHitpoints(); i++) {
        if (this.checkShipIsPlaced({ x: coords.x, y: coords.y + i })) {
          throw new Error(`Ship already placed at ${coords.x}, ${coords.y + i}`)
        }
        this.board[coords.y + i][coords.x] = ship
      }
    }
  }

  private checkBounds(
    coords: Coordinates,
    shipLength: number,
    orientation: 'horizontal' | 'vertical'
  ): boolean {
    if (coords.x < 0 || coords.x >= this.size || coords.y < 0 || coords.y >= this.size) return false
    if (orientation === 'horizontal') {
      if (coords.x + shipLength > this.size) return false
    } else {
      if (coords.y + shipLength > this.size) return false
    }
    return true
  }

  private checkShipIsPlaced(coords: Coordinates) {
    return this.board[coords.y][coords.x] !== undefined
  }
}
