import * as migration_20260902_233537_initial from "./20260902_233537_initial";

export const migrations = [
  {
    up: migration_20260902_233537_initial.up,
    down: migration_20260902_233537_initial.down,
    name: "20260902_233537_initial",
  },
];
