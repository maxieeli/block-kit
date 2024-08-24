import type { Command } from '@maxiee/block-std';

export const selectBlock: Command<'focusBlock'> = (ctx, next) => {
  const { focusBlock, std } = ctx;
  if (!focusBlock) {
    return;
  }

  const { selection } = std;

  selection.setGroup('note', [
    selection.create('block', { blockId: focusBlock.blockId }),
  ]);

  return next();
};

declare global {
  namespace BlockKit {
    interface Commands {
      selectBlock: typeof selectBlock;
    }
  }
}
