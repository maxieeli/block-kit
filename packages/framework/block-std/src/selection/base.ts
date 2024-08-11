type SelectionConstructor<T = unknown> = {
  type: string;
  group: string;
  new (...args: unknown[]): T;
};

export type BaseSelectionOptions = {
  blockId: string;
};

export abstract class BaseSelection {
  static readonly type: string;

  static readonly group: string;

  readonly blockId: string;

  constructor({ blockId }: BaseSelectionOptions) {
    this.blockId = blockId;
  }

  is<T extends BlockKit.SelectionType>(
    type: T
  ): this is BlockKit.SelectionInstance[T] {
    return this.type === type;
  }

  get type(): BlockKit.SelectionType {
    return (this.constructor as SelectionConstructor)
      .type as BlockKit.SelectionType;
  }

  get group(): string {
    return (this.constructor as SelectionConstructor).group;
  }

  abstract equals(other: BaseSelection): boolean;

  abstract toJSON(): Record<string, unknown>;

  static fromJSON(_: Record<string, unknown>): BaseSelection {
    throw new Error('You must override this method');
  }
}
