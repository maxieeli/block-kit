import type { Command } from '@maxiee/block-std';
import type { TextSelection } from '@maxiee/block-std';

export const getTextSelectionCommand: Command<never, 'currentTextSelection'> = (
  ctx,
  next
) => {
  const currentTextSelection = ctx.std.selection.find('text');
  if (!currentTextSelection) return;

  next({ currentTextSelection });
};

declare global {
  namespace BlockKit {
    interface CommandContext {
      currentTextSelection?: TextSelection;
    }

    interface Commands {
      getTextSelection: typeof getTextSelectionCommand;
    }
  }
}
