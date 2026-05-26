import { Logger } from "../core/logger.js";
import { HeroType } from "../core/types.js";
import { DamageOverTimeEffect, StatusEffect } from "../effects/damage-over-time.js";

export abstract class Hero {
  private health: number;
  private readonly strength: number;
  private readonly name: string;
  private readonly type: HeroType;
  private skipNextTurn = false;
  private canUseIceArrowCharges = 1;
  private readonly statusEffects: StatusEffect[] = [];

  protected constructor(type: HeroType, name: string, health: number, strength: number, iceArrowCharges: number) {
    this.type = type;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.canUseIceArrowCharges = iceArrowCharges;
  }

  public getName(): string {
    return this.name;
  }

  public getHealth(): number {
    return this.health;
  }

  public getStrength(): number {
    return this.strength;
  }

  public getType(): HeroType {
    return this.type;
  }

  public isAlive(): boolean {
    return this.health > 0;
  }

  public describe(): string {
    return `(${this.type}) ${this.name}`;
  }

  public onTurnStart(logger: Logger): void {
    for (const effect of this.statusEffects) {
      effect.onTurnStart(this, logger);
    }
    this.cleanupExpiredEffects();
  }

  public attack(target: Hero, logger: Logger): void {
    if (!this.isAlive()) {
      return;
    }
    target.receiveAttack(this.strength, this, logger);
    logger.log(`${this.describe()} наносит урон ${this.strength} противнику ${target.describe()}.`);
  }

  public useIceArrows(target: Hero, logger: Logger): boolean {
    if (!this.isAlive() || this.canUseIceArrowCharges <= 0) {
      return false;
    }

    this.canUseIceArrowCharges -= 1;
    target.receiveAttack(this.strength, this, logger);
    target.applyStatusEffect(new DamageOverTimeEffect("Ледяные стрелы", 2, 3));
    logger.log(`${this.describe()} использует Ледяные стрелы на ${target.describe()}.`);
    return true;
  }

  public setSkipNextTurn(value: boolean): void {
    this.skipNextTurn = value;
  }

  public shouldSkipTurn(): boolean {
    return this.skipNextTurn;
  }

  public resetSkipTurn(): void {
    this.skipNextTurn = false;
  }

  public receiveAttack(damage: number, attacker: Hero, logger: Logger): void {
    const finalDamage = this.onBeforeReceiveAttack(damage, attacker, logger);
    if (finalDamage <= 0) {
      return;
    }

    this.health = Math.max(0, this.health - finalDamage);
  }

  public receiveDirectDamage(damage: number): void {
    if (damage <= 0) {
      return;
    }
    this.health = Math.max(0, this.health - damage);
  }

  public applyStatusEffect(effect: StatusEffect): void {
    this.statusEffects.push(effect);
  }

  public clearNegativeEffects(): void {
    this.statusEffects.length = 0;
  }

  protected abstract onBeforeReceiveAttack(damage: number, attacker: Hero, logger: Logger): number;
  public abstract useClassAbility(target: Hero, logger: Logger): boolean;

  private cleanupExpiredEffects(): void {
    const aliveEffects = this.statusEffects.filter((item) => !item.isExpired());
    this.statusEffects.length = 0;
    this.statusEffects.push(...aliveEffects);
  }
}
