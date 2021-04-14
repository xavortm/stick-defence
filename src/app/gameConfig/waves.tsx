export interface WaveEnemiesInterface {
  meele?: number;
  rifle?: number;
}

export interface WaveInterface {
  enemies: WaveEnemiesInterface;
}

// Waves work on a change: first wave sets the initial values
// and all later waves change the previous one.
export const wavesSetup: WaveInterface[] = [
  {
    enemies: {
      meele: 1,
    },
  },
  {
    enemies: {
      meele: 1,
      rifle: 1,
    },
  },
];
