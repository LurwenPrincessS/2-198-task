import { Logger } from "../core/logger.js";
import { HeroType } from "../core/types.js";
import { Hero } from "./hero.js";

export class Mage extends Hero {
  public constructor(name: string, health: number, strength: number) {
    super(HeroType.Mage, name, health, strength, 1);
  }

  public useClassAbility(target: Hero, logger: Logger): boolean {
    if (!this.isAlive()) {
      return false;
    }

    target.setSkipNextTurn(true);
    logger.log(`${this.describe()} использует Заворожение. ${target.describe()} пропускает следующий ход.`);
    return true;
  }

  protected onBeforeReceiveAttack(damage: number): number {
    return damage;
  }
}
