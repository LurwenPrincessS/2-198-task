import { HeroType, RandomProvider } from "../core/types.js";
import { Archer } from "../heroes/archer.js";
import { Hero } from "../heroes/hero.js";
import { Knight } from "../heroes/knight.js";
import { Mage } from "../heroes/mage.js";

export interface HeroConfig {
  type: HeroType;
  name: string;
  health: number;
  strength: number;
}

export class HeroFactory {
  public createHero(config: HeroConfig): Hero {
    switch (config.type) {
      case HeroType.Knight:
        return new Knight(config.name, config.health, config.strength);
      case HeroType.Archer:
        return new Archer(config.name, config.health, config.strength);
      case HeroType.Mage:
        return new Mage(config.name, config.health, config.strength);
      default:
        throw new Error("Unsupported hero type");
    }
  }

  public createRandomHeroes(
    count: number,
    names: string[],
    random: RandomProvider,
    minHealth = 40,
    maxHealth = 120,
    minStrength = 5,
    maxStrength = 30
  ): Hero[] {
    if (count <= 0) {
      throw new Error("Hero count must be greater than zero");
    }
    if (names.length === 0) {
      throw new Error("At least one hero name must be provided");
    }
    if (minHealth > maxHealth || minStrength > maxStrength) {
      throw new Error("Invalid random ranges for hero stats");
    }

    const types = [HeroType.Knight, HeroType.Archer, HeroType.Mage];
    const heroes: Hero[] = [];

    for (let index = 0; index < count; index += 1) {
      const type = types[random.nextInt(0, types.length - 1)];
      const name = names[random.nextInt(0, names.length - 1)];
      const health = random.nextInt(minHealth, maxHealth);
      const strength = random.nextInt(minStrength, maxStrength);
      heroes.push(this.createHero({ type, name, health, strength }));
    }

    return heroes;
  }
}
