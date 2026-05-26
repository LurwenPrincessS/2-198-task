import { describe, expect, it } from "vitest";
import { Logger } from "../../src/core/logger.js";
import { Archer } from "../../src/heroes/archer.js";
import { Knight } from "../../src/heroes/knight.js";
import { Mage } from "../../src/heroes/mage.js";

describe("Class abilities", () => {
  it("knight vengeance strike deals +30% damage", () => {
    const logger = new Logger();
    const knight = new Knight("K", 100, 10);
    const target = new Archer("A", 100, 5);

    knight.useClassAbility(target, logger);

    expect(target.getHealth()).toBe(87);
  });

  it("mage enchantment forces target to skip next turn", () => {
    const logger = new Logger();
    const mage = new Mage("M", 100, 10);
    const target = new Knight("K", 100, 10);

    mage.useClassAbility(target, logger);

    expect(target.shouldSkipTurn()).toBe(true);
    target.resetSkipTurn();
    expect(target.shouldSkipTurn()).toBe(false);
  });

  it("archer fire arrows can only be used once", () => {
    const logger = new Logger();
    const archer = new Archer("A", 100, 10);
    const target = new Knight("K", 100, 10);

    const first = archer.useClassAbility(target, logger);
    const second = archer.useClassAbility(target, logger);

    expect(first).toBe(true);
    expect(second).toBe(false);
  });

  it("ice arrows stack damage over time", () => {
    const logger = new Logger();
    const archer = new Archer("A", 100, 10);
    const target = new Knight("K", 120, 10);

    archer.useIceArrows(target, logger);
    archer.useIceArrows(target, logger);

    target.onTurnStart(logger);
    target.onTurnStart(logger);

    // 2 direct attacks: 20 damage, and two DOT effects: 2*2 turns = 8
    expect(target.getHealth()).toBe(92);
  });
});
