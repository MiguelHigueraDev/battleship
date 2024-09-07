import { Player } from '@/classes/Player'
import type { Ship } from '@/classes/Ship'
import type { Coordinates } from '@/types/Coordinates'
import type { Orientation } from '@/types/Orientation'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const player = ref<Player>(new Player())
  const selectedShip = ref<Ship | null>(null)
  const selectedOrientation = ref<Orientation>('horizontal')

  const board = computed(() => player.value.getBoard())
  const placedShipIds = computed(() => {
    const placedShips = board.value.getPlacedShips()
    return new Set(placedShips.flatMap((row) => row.map((ship) => ship?.getId()).filter(Boolean)))
  })

  function changeOrientation() {
    selectedOrientation.value =
      selectedOrientation.value === 'horizontal' ? 'vertical' : 'horizontal'
  }

  function setSelectedShip(ship: Ship) {
    selectedShip.value = ship
  }

  function placeOrRemoveShip(position: Coordinates) {
    const shipAtPosition = board.value.getPlacedShips()[position.y][position.x]
    if (shipAtPosition) {
      removeShip(position)
    } else {
      placeShip(position)
    }
  }

  function placeShip(position: Coordinates) {
    if (selectedShip.value) {
      if (placedShipIds.value.has(selectedShip.value.getId())) {
        console.warn('This ship has already been placed! Remove it first.')
        return
      }

      try {
        board.value.placeShip(selectedShip.value as Ship, position, selectedOrientation.value)
        selectNextAvailableShip()
      } catch (error) {
        console.warn(error)
      }
    }
  }

  function removeShip(position: Coordinates) {
    const ship = board.value.getPlacedShips()[position.y][position.x]
    if (ship) {
      board.value.removeShip(ship)
    }
  }

  function selectNextAvailableShip() {
    const ships = board.value.getFleet().getShips()
    const currentIndex = ships.indexOf(selectedShip.value as Ship)
    // Cycles through the ships and selects the next available one if any
    for (let i = 1; i <= ships.length; i++) {
      const nextIndex = (currentIndex + i) % ships.length
      if (!placedShipIds.value.has(ships[nextIndex].getId())) {
        setSelectedShip(ships[nextIndex])
        return
      }
    }
  }

  return {
    player,
    selectedOrientation,
    changeOrientation,
    selectedShip,
    setSelectedShip,
    placeOrRemoveShip
  }
})
