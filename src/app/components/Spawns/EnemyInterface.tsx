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
}
