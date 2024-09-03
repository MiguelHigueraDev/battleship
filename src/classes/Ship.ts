import type { ShipType } from '@/types/ShipType'

export class Ship {
  private maxHitpoints: number
  private currentHitpoints: number

  constructor(shipType: ShipType) {
    this.maxHitpoints = shipType
    this.currentHitpoints = shipType
  }

  public getMaxHitpoints(): number {
    return this.maxHitpoints
  }

  public getHitpoints(): number {
    return this.currentHitpoints
  }

  public hit(): void {
    if (this.currentHitpoints < 1) return
    this.currentHitpoints -= 1
  }

  public isDestroyed(): boolean {
    return this.currentHitpoints < 1
  }
}
