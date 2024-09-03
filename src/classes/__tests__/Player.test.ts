import { beforeEach, describe, expect, it } from 'vitest'
import { Player } from '../Player'
import { Ship } from '../Ship'
import { ShipType } from '@/types/ShipType'

describe('Player', () => {
  let player: Player

  beforeEach(() => {
    player = new Player()
  })

  it('should initialize with a fleet', () => {
    expect(player.getFleet()).toBeDefined()
  })

  it('should add ships to the fleet', () => {
    const initialFleetSize = player.getFleet().getShips().length
    player.addShip(new Ship(ShipType.CARRIER))
    expect(player.getFleet().getShips().length).toBe(initialFleetSize + 1)
  })

  it('should remove ships from the fleet', () => {
    const ship = new Ship(ShipType.CARRIER)
    player.addShip(ship)
    const initialFleetSize = player.getFleet().getShips().length
    player.removeShip(ship)
    expect(player.getFleet().getShips().length).toBe(initialFleetSize - 1)
  })

  it('should report as not defeated when ships are not destroyed', () => {
    expect(player.isDefeated()).toBe(false)
  })

  it('should report as defeated when all ships are destroyed', () => {
    for (const ship of player.getFleet().getShips()) {
      for (let i = 0; i < ship.getMaxHitpoints(); i++) {
        ship.hit()
      }
    }
    expect(player.isDefeated()).toBe(true)
  })

  it('should reset the fleet', () => {
    const ship = new Ship(ShipType.CARRIER)
    player.addShip(ship)
    player.reset()
    // Default fleet size is 5
    expect(player.getFleet().getShips().length).toBe(5)
  })
})
