import * as migration_20260902_233537_initial from "./20260902_233537_initial";
import * as migration_20260903_024716_drop_manifesto_label from "./20260903_024716_drop_manifesto_label";

export const migrations = [
  {
    up: migration_20260902_233537_initial.up,
    down: migration_20260902_233537_initial.down,
    name: "20260902_233537_initial",
  },
  {
    up: migration_20260903_024716_drop_manifesto_label.up,
    down: migration_20260903_024716_drop_manifesto_label.down,
    name: "20260903_024716_drop_manifesto_label",
  },
];
