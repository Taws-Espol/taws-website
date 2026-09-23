import * as migration_20260902_233537_initial from "./20260902_233537_initial";
import * as migration_20260903_024716_drop_manifesto_label from "./20260903_024716_drop_manifesto_label";
import * as migration_20260923_190553_application_semester_and_recommendation_letter from "./20260923_190553_application_semester_and_recommendation_letter";
import * as migration_20260923_204141_application_programming_fundamentals from "./20260923_204141_application_programming_fundamentals";

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
  {
    up: migration_20260923_190553_application_semester_and_recommendation_letter.up,
    down: migration_20260923_190553_application_semester_and_recommendation_letter.down,
    name: "20260923_190553_application_semester_and_recommendation_letter",
  },
  {
    up: migration_20260923_204141_application_programming_fundamentals.up,
    down: migration_20260923_204141_application_programming_fundamentals.down,
    name: "20260923_204141_application_programming_fundamentals",
  },
];
