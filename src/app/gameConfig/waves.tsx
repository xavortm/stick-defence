interface WaveInterface {
  time: number;
  enemies: {
    meele?: number;
    rifle?: number;
  };
}

// Waves work on a change: first wave sets the initial values
// and all later waves change the previous one.
const Waves: WaveInterface[] = [
  {
    time: 1000,
    enemies: {
      meele: 10,
    },
  },
];

export default Waves;
