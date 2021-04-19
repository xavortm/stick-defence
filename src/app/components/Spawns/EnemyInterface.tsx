export type EnemyTypesString = 'rifle' | 'meele';
export type EnemyTypes = Array<'rifle' | 'meele'>;

export default interface EnemyInterface {
  /**
   * Each enemy needs a type and the type will define which enemy to load from the components.
   */
  type: string;

  /**
   * Width of the box that contains an enemy.
   * It defines dimentions for the hitbox. It's where a user can click to kill the enemy.
   */
  boxSizeWidth: number;

  /**
   * Height of the box that contains an enemy.
   * It defines dimentions for the hitbox. It's where a user can click to kill the enemy.
   */
  boxSizeHeight: number;

  /**
   * Health must always be a positive number.
   */
  health: number;

  /**
   * Armor is used to caluclate more complex damage reductions.
   */
  armor: number;

  /**
   * The amount of money the player earns when an enemy is killed.
   */
  bounty: number;

  /**
   * How much damage is the enemy dealing to the base per second?
   */
  dps: number;

  /**
   * How fast the enemy moves? *It could have some ranomization fuzzyness
   */
  speed: number;
}
