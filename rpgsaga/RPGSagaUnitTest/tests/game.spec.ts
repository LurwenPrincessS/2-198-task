import { describe, expect, it } from "vitest";
import { Game } from "../../src/core/game.js";
import { Logger } from "../../src/core/logger.js";
import { StubRandom } from "./helpers.js";

describe("Game", () => {
  it("runs tournament and returns winner", () => {
    const logger = new Logger();
    const random = new StubRandom([0, 0, 80, 80, 80, 80, 80, 80]);
    const game = new Game(logger, random);

    const winner = game.runTournament(2, ["HeroA", "HeroB"]);

    expect(winner.isAlive()).toBe(true);
    expect(logger.getLogs().some((line) => line.includes("Победитель турнира"))).toBe(true);
  });
});
