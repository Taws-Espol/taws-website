import * as migration_20260902_233036_initial from "./20260902_233036_initial";

export const migrations = [
  {
    up: migration_20260902_233036_initial.up,
    down: migration_20260902_233036_initial.down,
    name: "20260902_233036_initial",
  },
];
