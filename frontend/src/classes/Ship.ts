import { shipTypeToName, type ShipType } from "../../../shared/ShipType"


export class Ship {
  private id: string
  private maxHitpoints: number
  private currentHitpoints: number

  constructor(shipType: ShipType) {
    this.id = crypto.randomUUID()
    this.maxHitpoints = shipType
    this.currentHitpoints = shipType
  }

  public getId(): string {
    return this.id
  }

  public getMaxHitpoints(): number {
    return this.maxHitpoints
  }

  public getHitpoints(): number {
    return this.currentHitpoints
  }

  public getName(): string {
    return shipTypeToName[this.maxHitpoints as keyof typeof shipTypeToName]
  }

  public hit(): void {
    if (this.currentHitpoints < 1) return
    this.currentHitpoints -= 1
  }

  public destroy(): void {
    this.currentHitpoints = 0
  }

  public isDestroyed(): boolean {
    return this.currentHitpoints < 1
  }
}
