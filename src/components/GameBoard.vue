<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import { storeToRefs } from 'pinia'

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)
const { placeOrRemoveShip } = playerStore
</script>

<template>
  <div class="row" :key="rowIndex" v-for="(row, rowIndex) in player.getBoard().getPlacedShips()">
    <button
      class="cell"
      :class="{ ship: shipCell != null }"
      :key="cellIndex"
      v-for="(shipCell, cellIndex) in row"
      @click="() => placeOrRemoveShip({ x: cellIndex, y: rowIndex })"
    >{{ rowIndex}}, {{cellIndex }}</button>
  </div>
</template>

<style scoped lang="css">
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 0.5px;
  background-color: white;
  cursor: pointer;
}

.cell:hover {
  background-color: lightgray;
}

.cell:active {
  background-color: gray;
}

.ship {
  background-color: blue;
}
</style>
