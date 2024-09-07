import { beforeEach, describe, expect, it } from 'vitest'
import { Fleet } from '../Fleet'
import { ShipType } from '@/types/ShipType'
import { Ship } from '../Ship'

describe('Fleet', () => {
  let fleet: Fleet

  beforeEach(() => {
    // 4 = ShipType.BATTLESHIP
    // 5 = ShipType.CARRIER
    const carrier = new Ship(ShipType.CARRIER)
    const battleship = new Ship(ShipType.BATTLESHIP)
    fleet = new Fleet([carrier, battleship])
  })

  it('should initialize with correct ships', () => {
    const ships = fleet.getShips()
    expect(ships.length).toBe(2)
    expect(ships[0].getMaxHitpoints()).toBe(ShipType.CARRIER)
    expect(ships[1].getMaxHitpoints()).toBe(ShipType.BATTLESHIP)
  })

  it('should add ships', () => {
    const cruiser = new Ship(ShipType.CRUISER)
    fleet.addShip(cruiser)
    const ships = fleet.getShips()
    expect(ships.length).toBe(3)
    expect(ships[2].getMaxHitpoints()).toBe(ShipType.CRUISER)
  })

  it('should remove ships', () => {
    fleet.removeShip(fleet.getShips()[0])
    const ships = fleet.getShips()
    expect(ships.length).toBe(1)
    expect(ships[0].getMaxHitpoints()).toBe(ShipType.BATTLESHIP)
  })

  it('should report as not destroyed when ships are not destroyed', () => {
    expect(fleet.isDestroyed()).toBe(false)
  })

  it('should report as destroyed when all ships are destroyed', () => {
    for (const ship of fleet.getShips()) {
      for (let i = 0; i < ship.getMaxHitpoints(); i++) {
        ship.hit()
      }
    }
    expect(fleet.isDestroyed()).toBe(true)
  })
})
