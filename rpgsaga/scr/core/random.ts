import { RandomProvider } from "./types.js";

export class DefaultRandomProvider implements RandomProvider {
  public nextInt(minInclusive: number, maxInclusive: number): number {
    const span = maxInclusive - minInclusive + 1;
    return minInclusive + Math.floor(Math.random() * span);
  }

  public chance(probability: number): boolean {
    return Math.random() < probability;
  }
}
