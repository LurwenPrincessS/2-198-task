import { Logger } from "../core/logger.js";
import { Hero } from "../heroes/hero.js";

export interface StatusEffect {
  readonly name: string;
  onTurnStart(owner: Hero, logger: Logger): void;
  isExpired(): boolean;
}

export class DamageOverTimeEffect implements StatusEffect {
  private turnsLeft: number;

  public constructor(
    public readonly name: string,
    private readonly damagePerTurn: number,
    turns: number
  ) {
    this.turnsLeft = turns;
  }

  public onTurnStart(owner: Hero, logger: Logger): void {
    if (this.turnsLeft <= 0 || !owner.isAlive()) {
      return;
    }

    owner.receiveDirectDamage(this.damagePerTurn);
    this.turnsLeft -= 1;
    logger.log(`${owner.describe()} получает ${this.damagePerTurn} периодического урона от эффекта ${this.name}.`);
  }

  public isExpired(): boolean {
    return this.turnsLeft <= 0;
  }
}
