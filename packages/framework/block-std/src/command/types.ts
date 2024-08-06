// type A = {};
// type B = { prop?: string };
// type C = { prop: string };
// type TestA = MakeOptionalIfEmpty<A>;  // void | {}
// type TestB = MakeOptionalIfEmpty<B>;  // void | { prop?: string }
// type TestC = MakeOptionalIfEmpty<C>;  // { prop: string }
import type { cmdSymbol } from './consts.js';

export type IfAllKeysOptional<T, Yes, No> =
  Partial<T> extends T ? (T extends Partial<T> ? Yes : No) : No;
type MakeOptionalIfEmpty<T> = IfAllKeysOptional<T, void | T, T>;

export interface InitCommandCtx {
  std: BlockKit.Std;
}

export type CommandKeyToData<K extends BlockKit.CommandDataName> = Pick<
BlockKit.CommandContext,
  K
>;
export type Command<
  In extends BlockKit.CommandDataName = never,
  Out extends BlockKit.CommandDataName = never,
  // eslint-disable-next-line @typescript-eslint/ban-types
  InData extends object = {},
> = (
  ctx: CommandKeyToData<In> & InitCommandCtx & InData,
  next: (ctx?: CommandKeyToData<Out>) => void
) => void;
type Omit1<A, B> = [keyof Omit<A, keyof B>] extends [never]
  ? void
  : Omit<A, keyof B>;
export type InDataOfCommand<C> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends Command<infer K, any, infer R> ? CommandKeyToData<K> & R : never;
type OutDataOfCommand<C> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends Command<any, infer K, any> ? CommandKeyToData<K> : never;

// eslint-disable-next-line @typescript-eslint/ban-types
type CommonMethods<In extends object = {}> = {
  inline: <InlineOut extends BlockKit.CommandDataName = never>(
    command: Command<Extract<keyof In, BlockKit.CommandDataName>, InlineOut>
  ) => Chain<In & CommandKeyToData<InlineOut>>;
  try: <InlineOut extends BlockKit.CommandDataName = never>(
    fn: (chain: Chain<In>) => Chain<In & CommandKeyToData<InlineOut>>[]
  ) => Chain<In & CommandKeyToData<InlineOut>>;
  tryAll: <InlineOut extends BlockKit.CommandDataName = never>(
    fn: (chain: Chain<In>) => Chain<In & CommandKeyToData<InlineOut>>[]
  ) => Chain<In & CommandKeyToData<InlineOut>>;
  run(): [
    result: boolean,
    ctx: CommandKeyToData<Extract<keyof In, BlockKit.CommandDataName>>,
  ];
  with<T extends Partial<BlockKit.CommandContext>>(value: T): Chain<In & T>;
};

type Cmds = {
  [cmdSymbol]: Command[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Chain<In extends object = {}> = CommonMethods<In> & {
  [K in keyof BlockKit.Commands]: (
    data: MakeOptionalIfEmpty<
      Omit1<InDataOfCommand<BlockKit.Commands[K]>, In>
    >
  ) => Chain<In & OutDataOfCommand<BlockKit.Commands[K]>>;
} & Cmds;

export type ExecCommandResult<K extends keyof BlockKit.Commands> =
  OutDataOfCommand<BlockKit.Commands[K]>;

declare global {
  namespace BlockKit {
    interface CommandContext extends InitCommandCtx {}

    interface Commands {}

    type CommandName = keyof Commands;
    type CommandDataName = keyof CommandContext;

    // eslint-disable-next-line @typescript-eslint/ban-types
    type CommandChain<In extends object = {}> = Chain<In & InitCommandCtx>;
  }
}
