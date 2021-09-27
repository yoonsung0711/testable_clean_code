import { GenSeeds } from './gen-seeds';

export interface ISeedGenerator<T> {
  createSeeds: (baseUrl: string) => () => Promise<T[]>
}

export function SeedGenerator() {
  const genSeeds = GenSeeds

  return {
    genSeeds
  }
}