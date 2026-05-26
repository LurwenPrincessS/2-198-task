import { Logger } from "../core/logger.js";
import { HeroType } from "../core/types.js";
import { Hero } from "./hero.js";

export class Knight extends Hero {
  public constructor(name: string, health: number, strength: number) {
    super(HeroType.Knight, name, health, strength, 1);
  }

  public useClassAbility(target: Hero, logger: Logger): boolean {
    if (!this.isAlive()) {
      return false;
    }

    const damage = Math.ceil(this.getStrength() * 1.3);
    target.receiveAttack(damage, this, logger);
    logger.log(`${this.describe()} использует Удар возмездия и наносит ${damage} урона ${target.describe()}.`);
    return true;
  }

  protected onBeforeReceiveAttack(damage: number): number {
    return damage;
  }
}
