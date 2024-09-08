import { describe, it, expect, beforeEach } from 'vitest'
import { Board } from '../Board'
import { Ship } from '../Ship'
import type { Coordinates } from '../../../../shared/Coordinates'
import { ShipType } from '../../../../shared/ShipType'

describe('Board', () => {
  let board: Board

  beforeEach(() => {
    board = new Board(10)
  })

  describe('constructor', () => {
    it('should create a board with the specified size', () => {
      expect(board.getSize()).toBe(10)
      expect(board.getPlacedShips().length).toBe(10)
      expect(board.getPlacedShips()[0].length).toBe(10)
    })

    it('should initialize an empty board', () => {
      const emptyBoard = board.getPlacedShips()
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          expect(emptyBoard[y][x]).toBeUndefined()
        }
      }
    })
  })

  describe('placeShip', () => {
    it('should place a ship horizontally', () => {
      const ship = new Ship(ShipType.CRUISER)
      const coords: Coordinates = { x: 0, y: 0 }
      board.placeShip(ship, coords, 'horizontal')

      const placedBoard = board.getPlacedShips()
      expect(placedBoard[0][0]).toBe(ship)
      expect(placedBoard[0][1]).toBe(ship)
      expect(placedBoard[0][2]).toBe(ship)
      expect(placedBoard[0][3]).toBeUndefined()
      expect(placedBoard[1][0]).toBeUndefined()
    })

    it('should place a ship vertically', () => {
      const ship = new Ship(ShipType.CRUISER)
      const coords: Coordinates = { x: 0, y: 0 }
      board.placeShip(ship, coords, 'vertical')

      const placedBoard = board.getPlacedShips()
      expect(placedBoard[0][0]).toBe(ship)
      expect(placedBoard[1][0]).toBe(ship)
      expect(placedBoard[2][0]).toBe(ship)
      expect(placedBoard[3][0]).toBeUndefined()
      expect(placedBoard[0][1]).toBeUndefined()
    })

    it('should throw an error when placing a ship out of bounds horizontally', () => {
      const ship = new Ship(ShipType.CRUISER)
      const coords: Coordinates = { x: 8, y: 0 }
      expect(() => board.placeShip(ship, coords, 'horizontal')).toThrow('Ship out of bounds')

      const placedBoard = board.getPlacedShips()
      expect(placedBoard[0][8]).toBeUndefined()
      expect(placedBoard[0][9]).toBeUndefined()
    })

    it('should throw an error when placing a ship out of bounds vertically', () => {
      const ship = new Ship(ShipType.CRUISER)
      const coords: Coordinates = { x: 0, y: 8 }
      expect(() => board.placeShip(ship, coords, 'vertical')).toThrow('Ship out of bounds')

      const placedBoard = board.getPlacedShips()
      expect(placedBoard[8][0]).toBeUndefined()
      expect(placedBoard[9][0]).toBeUndefined()
    })

    it('should throw an error when placing a ship on top of another ship', () => {
      const ship1 = new Ship(ShipType.CRUISER)
      const ship2 = new Ship(ShipType.DESTROYER)
      board.placeShip(ship1, { x: 0, y: 0 }, 'horizontal')
      expect(() => board.placeShip(ship2, { x: 1, y: 0 }, 'vertical')).toThrow(
        'Ship already placed in this area'
      )

      const placedBoard = board.getPlacedShips()
      expect(placedBoard[0][0]).toBe(ship1)
      expect(placedBoard[0][1]).toBe(ship1)
      expect(placedBoard[0][2]).toBe(ship1)
      expect(placedBoard[1][1]).toBeUndefined()
    })
  })

  describe('receiveAttack', () => {
    it('should hit a ship on the board', () => {
      const ship = new Ship(ShipType.CRUISER)
      board.placeShip(ship, { x: 0, y: 0 }, 'horizontal')
      board.receiveAttack({ x: 0, y: 0 })
      expect(ship.getHitpoints()).toBe(2)
    })
  })
})
