class RandomPicker<T> {
  private _originalArray: T[];

  private _copyArray: T[];

  constructor(array: T[]) {
    this._originalArray = [...array];
    this._copyArray = [...array];
  }

  private randomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  pick(): T {
    if (this._copyArray.length === 0) {
      this._copyArray = [...this._originalArray];
    }

    const index = this.randomIndex(this._copyArray.length);
    const item = this._copyArray[index];
    this._copyArray.splice(index, 1);
    return item;
  }
}

export const multiPlayersColor = new RandomPicker([
  'var(--workbench-multi-players-purple)',
  'var(--workbench-multi-players-magenta)',
  'var(--workbench-multi-players-red)',
  'var(--workbench-multi-players-orange)',
  'var(--workbench-multi-players-green)',
  'var(--workbench-multi-players-blue)',
  'var(--workbench-multi-players-brown)',
  'var(--workbench-multi-players-grey)',
]);
