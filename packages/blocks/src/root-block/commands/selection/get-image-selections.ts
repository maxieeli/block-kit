import type { Command } from '@maxiee/block-std';

import type { ImageSelection } from '../../../image-block/image-selection.js';

export const getImageSelectionsCommand: Command<
  never,
  'currentImageSelections'
> = (ctx, next) => {
  const currentImageSelections = ctx.std.selection.filter('image');
  if (currentImageSelections.length === 0) return;

  next({ currentImageSelections });
};

declare global {
  namespace BlockKit {
    interface CommandContext {
      currentImageSelections?: ImageSelection[];
    }

    interface Commands {
      getImageSelections: typeof getImageSelectionsCommand;
    }
  }
}
