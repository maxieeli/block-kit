import type { Command } from '@maxiee/block-std';
import type { BlockSelection } from '@maxiee/block-std';

export const getBlockSelectionsCommand: Command<
  never,
  'currentBlockSelections'
> = (ctx, next) => {
  const currentBlockSelections = ctx.std.selection.filter('block');
  if (currentBlockSelections.length === 0) return;

  next({ currentBlockSelections });
};

declare global {
  namespace BlockKit {
    interface CommandContext {
      currentBlockSelections?: BlockSelection[];
    }

    interface Commands {
      getBlockSelections: typeof getBlockSelectionsCommand;
    }
  }
}
