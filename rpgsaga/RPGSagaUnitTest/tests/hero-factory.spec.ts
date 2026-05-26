import { describe, expect, it } from "vitest";
import { HeroType } from "../../src/core/types.js";
import { HeroFactory } from "../../src/factory/hero-factory.js";

describe("HeroFactory", () => {
  it("creates a concrete hero from HeroType", () => {
    const factory = new HeroFactory();
    const hero = factory.createHero({ type: HeroType.Knight, name: "Arthur", health: 100, strength: 20 });

    expect(hero.getType()).toBe(HeroType.Knight);
    expect(hero.getName()).toBe("Arthur");
    expect(hero.getHealth()).toBe(100);
    expect(hero.getStrength()).toBe(20);
  });

  it("creates random hero array with requested size", () => {
    const factory = new HeroFactory();
    const random = { nextInt: () => 0, chance: () => true };

    const heroes = factory.createRandomHeroes(4, ["A", "B"], random);
    expect(heroes).toHaveLength(4);
    expect(heroes.every((hero) => hero.getName() === "A")).toBe(true);
  });

  it("throws when names list is empty", () => {
    const factory = new HeroFactory();
    const random = { nextInt: () => 0, chance: () => true };

    expect(() => factory.createRandomHeroes(2, [], random)).toThrow("At least one hero name");
  });
});
