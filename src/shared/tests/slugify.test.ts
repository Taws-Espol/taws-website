import { describe, expect, it } from "vitest";

import { slugify } from "@/shared/utils/slugify";

describe("slugify", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(slugify("Git para tu primer proyecto")).toBe(
      "git-para-tu-primer-proyecto",
    );
  });

  it("folds Spanish accents", () => {
    expect(slugify("Cómo instalar MongoDB sin perderte")).toBe(
      "como-instalar-mongodb-sin-perderte",
    );
  });

  it("folds ñ to n", () => {
    expect(slugify("Diseño de la caña")).toBe("diseno-de-la-cana");
  });

  it("drops punctuation and symbols", () => {
    expect(slugify("¿Qué es TAWS? ¡Descúbrelo! (2026)")).toBe(
      "que-es-taws-descubrelo-2026",
    );
  });

  it("collapses repeated whitespace into one hyphen", () => {
    expect(slugify("Data   science\ty\nmás")).toBe("data-science-y-mas");
  });

  it("trims hyphens from both ends", () => {
    expect(slugify("  —Hola—  ")).toBe("hola");
  });

  it("returns an empty string for a title with nothing to slug", () => {
    expect(slugify("¿¡—!?")).toBe("");
  });

  it("keeps digits", () => {
    expect(slugify("Convocatoria 2026")).toBe("convocatoria-2026");
  });
});
