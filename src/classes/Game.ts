import type { Player } from './Player'

export class Game {
  private players: Player[]
  private currentPlayer: Player
  private winner: Player | null

  constructor(players: Player[]) {
    this.players = players
    this.currentPlayer = players[0]
    this.winner = null
  }

  public getCurrentPlayer(): Player {
    return this.currentPlayer
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public getWinner(): Player | null {
    return this.winner
  }

  public switchTurn(): void {
    this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0]
  }

  public isGameOver(): boolean {
    return this.players.some((player) => player.isDefeated())
  }

  public endGame(): void {
    this.winner = this.players.find((player) => !player.isDefeated()) || null
  }

  public reset(): void {
    this.players.forEach((player) => player.reset())
    this.currentPlayer = this.players[0]
    this.winner = null
  }
}
