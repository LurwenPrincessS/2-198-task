import { Logger } from "./logger.js";
import { DefaultRandomProvider } from "./random.js";
import { HeroFactory } from "../factory/hero-factory.js";
import { Hero } from "../heroes/hero.js";
import { RandomProvider } from "./types.js";

export class Game {
  private readonly logger: Logger;
  private readonly random: RandomProvider;
  private readonly heroFactory: HeroFactory;

  public constructor(logger: Logger, random: RandomProvider = new DefaultRandomProvider(), heroFactory: HeroFactory = new HeroFactory()) {
    this.logger = logger;
    this.random = random;
    this.heroFactory = heroFactory;
  }

  public runTournament(playerCount: number, names: string[]): Hero {
    if (playerCount <= 1 || playerCount % 2 !== 0) {
      throw new Error("Количество игроков должно быть четным и больше 1.");
    }

    let activeHeroes = this.heroFactory.createRandomHeroes(playerCount, names, this.random);
    let round = 1;

    while (activeHeroes.length > 1) {
      this.logger.log(`Кон ${round}.`);
      activeHeroes = this.shuffle(activeHeroes);

      const winners: Hero[] = [];
      for (let i = 0; i < activeHeroes.length; i += 2) {
        const winner = this.duel(activeHeroes[i], activeHeroes[i + 1]);
        winners.push(winner);
      }

      activeHeroes = winners;
      round += 1;
    }

    this.logger.log(`Победитель турнира: ${activeHeroes[0].describe()} с ${activeHeroes[0].getHealth()} HP.`);
    return activeHeroes[0];
  }

  private duel(first: Hero, second: Hero): Hero {
    this.logger.log(`${first.describe()} vs ${second.describe()}`);

    let attacker = first;
    let defender = second;

    while (first.isAlive() && second.isAlive()) {
      attacker.onTurnStart(this.logger);
      if (!attacker.isAlive()) {
        break;
      }

      if (attacker.shouldSkipTurn()) {
        attacker.resetSkipTurn();
        this.logger.log(`${attacker.describe()} пропускает ход.`);
      } else {
        this.performRandomAction(attacker, defender);
      }

      if (!defender.isAlive()) {
        this.logger.log(`${defender.describe()} погибает.`);
        break;
      }

      const temp = attacker;
      attacker = defender;
      defender = temp;
    }

    return first.isAlive() ? first : second;
  }

  private performRandomAction(attacker: Hero, defender: Hero): void {
    const action = this.random.nextInt(1, 100);

    if (action <= 20 && attacker.useClassAbility(defender, this.logger)) {
      return;
    }

    if (action > 20 && action <= 35 && attacker.useIceArrows(defender, this.logger)) {
      return;
    }

    attacker.attack(defender, this.logger);
  }

  private shuffle(heroes: Hero[]): Hero[] {
    const items = [...heroes];
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = this.random.nextInt(0, i);
      const temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
    return items;
  }
}
