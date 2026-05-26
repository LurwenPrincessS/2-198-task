import { RandomProvider } from "../../src/core/types.js";

export class StubRandom implements RandomProvider {
  private position = 0;

  public constructor(private readonly values: number[]) {}

  public nextInt(minInclusive: number, maxInclusive: number): number {
    const value = this.values[this.position % this.values.length];
    this.position += 1;
    if (value < minInclusive) {
      return minInclusive;
    }
    if (value > maxInclusive) {
      return maxInclusive;
    }
    return value;
  }

  public chance(probability: number): boolean {
    return probability >= 0.5;
  }
}
