<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const playerStore = usePlayerStore()
const { player, selectedShip, selectedOrientation } = storeToRefs(playerStore)
const { setSelectedShip, changeOrientation } = playerStore

const board = computed(() => player.value.getBoard())
const fleet = computed(() => board.value.getFleet())
const allShips = computed(() => fleet.value.getShips())
const placedShips = computed(() => board.value.getPlacedShips())

const placedShipIds = computed(() => {
  const ids = placedShips.value.flatMap((row) => row.map((ship) => ship?.getId()).filter(Boolean))
  return new Set(ids)
})
</script>

<template>
  <div>
    <h2>Place your ships</h2>
    <div class="ships">
      <button
        v-for="ship in allShips"
        :key="ship.getId()"
        class="ship"
        :class="{ placed: placedShipIds.has(ship.getId()) }"
        @click="setSelectedShip(ship)"
      >
        <div
          v-for="i in ship.getMaxHitpoints()"
          :key="i"
          class="ship-part"
          :class="{ selected: selectedShip?.getId() === ship.getId() }"
        ></div>
      </button>
    </div>
    <button @click="changeOrientation">Orientation: {{ selectedOrientation }}</button>
  </div>
</template>

<style scoped lang="css">
.ships {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ship {
  display: flex;
}

.ship-part {
  width: 24px;
  height: 24px;
  background-color: black;
  border: 1px solid white;
}

.selected {
  background-color: red;
}

.placed {
  background-color: green;
}
</style>
