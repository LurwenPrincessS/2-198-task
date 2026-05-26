export enum HeroType {
  Knight = "Knight",
  Archer = "Archer",
  Mage = "Mage"
}

export interface RandomProvider {
  nextInt(minInclusive: number, maxInclusive: number): number;
  chance(probability: number): boolean;
}
