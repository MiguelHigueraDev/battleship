import { describe, it, expect, beforeEach } from 'vitest'
import { Ship } from '../Ship'
import { ShipType } from '../../../../shared/ShipType'

describe('Ship', () => {
  let ship: Ship

  beforeEach(() => {
    // ShipType.CRUISER = 3
    ship = new Ship(ShipType.CRUISER)
  })

  it('should initialize with correct max hitpoints', () => {
    expect(ship.getMaxHitpoints()).toBe(ShipType.CRUISER)
  })

  it('should decrease hitpoints when hit', () => {
    const initialHitpoints = ship.getHitpoints()
    ship.hit()
    expect(ship.getHitpoints()).toBe(initialHitpoints - 1)
  })

  it('should not decrease hitpoints below 0', () => {
    for (let i = 0; i < ship.getMaxHitpoints() + 1; i++) {
      ship.hit()
    }
    expect(ship.getHitpoints()).toBe(0)
  })

  it('should report as not destroyed when hitpoints > 0', () => {
    expect(ship.isDestroyed()).toBe(false)
  })

  it('should report as destroyed when hitpoints = 0', () => {
    for (let i = 0; i < ship.getMaxHitpoints(); i++) {
      ship.hit()
    }
    expect(ship.isDestroyed()).toBe(true)
  })

  it('should not change state when hit after being destroyed', () => {
    for (let i = 0; i < ship.getMaxHitpoints(); i++) {
      ship.hit()
    }
    const hitpointsWhenDestroyed = ship.getHitpoints()
    ship.hit()
    expect(ship.getHitpoints()).toBe(hitpointsWhenDestroyed)
    expect(ship.isDestroyed()).toBe(true)
  })
})
