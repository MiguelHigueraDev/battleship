import type { SHIP_TYPES } from '@/types/ShipType'

export class Ship {
  private hitpoints: number

  constructor(shipType: SHIP_TYPES) {
    this.hitpoints = shipType
  }
}
