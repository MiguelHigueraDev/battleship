import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Game } from '../Game'
import { Player } from '../Player'

describe('Game', () => {
  let game: Game
  let player1: Player
  let player2: Player

  beforeEach(() => {
    player1 = new Player()
    player2 = new Player()
    game = new Game([player1, player2])
  })

  describe('constructor', () => {
    it('should initialize with two players', () => {
      expect(game.getPlayers().length).toBe(2)
      expect(game.getPlayers()[0]).toBe(player1)
      expect(game.getPlayers()[1]).toBe(player2)
    })

    it('should set the current player to the first player', () => {
      expect(game.getCurrentPlayer()).toBe(player1)
    })

    it('should initialize with no winner', () => {
      expect(game.getWinner()).toBeNull()
    })
  })

  describe('switchTurn', () => {
    it('should switch the current player', () => {
      expect(game.getCurrentPlayer()).toBe(player1)
      game.switchTurn()
      expect(game.getCurrentPlayer()).toBe(player2)
      game.switchTurn()
      expect(game.getCurrentPlayer()).toBe(player1)
    })
  })

  describe('isGameOver', () => {
    it('should return false when no player is defeated', () => {
      expect(game.isGameOver()).toBe(false)
    })

    it('should return true when a player is defeated', () => {
      player1.setDefeated()
      expect(game.isGameOver()).toBe(true)
    })
  })

  describe('endGame', () => {
    it('should set the winner to the non-defeated player', () => {
      player1.setDefeated()
      game.endGame()
      expect(game.getWinner()).toBe(player2)
    })

    it('should set the winner to null if both players are defeated', () => {
      player1.setDefeated()
      player2.setDefeated()
      game.endGame()
      expect(game.getWinner()).toBeNull()
    })
  })

  describe('reset', () => {
    it('should reset all players', () => {
      const spy1 = vi.spyOn(player1, 'reset')
      const spy2 = vi.spyOn(player2, 'reset')
      game.reset()
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
    })

    it('should set the current player to the first player', () => {
      game.switchTurn() // Current player is now player2
      game.reset()
      expect(game.getCurrentPlayer()).toBe(player1)
    })

    it('should clear the winner', () => {
      player1.setDefeated()
      game.endGame()
      expect(game.getWinner()).toBe(player2)
      game.reset()
      expect(game.getWinner()).toBeNull()
    })
  })
})
