import { Logger } from "../core/logger.js";
import { HeroType } from "../core/types.js";
import { DamageOverTimeEffect } from "../effects/damage-over-time.js";
import { Hero } from "./hero.js";

export class Archer extends Hero {
  private fireArrowsActivated = false;

  public constructor(name: string, health: number, strength: number) {
    super(HeroType.Archer, name, health, strength, 2);
  }

  public useClassAbility(target: Hero, logger: Logger): boolean {
    if (!this.isAlive() || this.fireArrowsActivated) {
      return false;
    }

    this.fireArrowsActivated = true;
    target.applyStatusEffect(new DamageOverTimeEffect("Огненные стрелы", 2, 999));
    logger.log(`${this.describe()} использует Огненные стрелы. ${target.describe()} горит и получает 2 урона каждый ход.`);
    return true;
  }

  protected onBeforeReceiveAttack(damage: number): number {
    return damage;
  }
}
