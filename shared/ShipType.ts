export enum ShipType {
  CARRIER = 5,
  BATTLESHIP = 4,
  CRUISER = 3,
  DESTROYER = 2,
  SUBMARINE = 1,
}

export const shipTypeToName = {
  [ShipType.CARRIER]: "Carrier",
  [ShipType.BATTLESHIP]: "Battleship",
  [ShipType.CRUISER]: "Cruiser",
  [ShipType.DESTROYER]: "Destroyer",
  [ShipType.SUBMARINE]: "Submarine",
};
