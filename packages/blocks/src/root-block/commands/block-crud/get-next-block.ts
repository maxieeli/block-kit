import type { Command } from '@maxiee/block-std';
import type { BlockElement } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';

function getNext(std: BlockKit.Std, blockElement: BlockElement) {
  const view = std.view;
  const next = std.doc.getNext(blockElement.model);
  if (!next) return null;
  return view.getBlock(next.id);
}

function getNextBlock(std: BlockKit.Std, path: string) {
  const view = std.view;
  const focusBlock = view.getBlock(path);
  if (!focusBlock) return null;

  let next: BlockElement | null = null;
  if (focusBlock.childBlockElements[0]) {
    next = focusBlock.childBlockElements[0];
  }

  if (!next) {
    next = getNext(std, focusBlock);
  }

  if (next && !next.contains(focusBlock)) {
    return next;
  }

  return null;
}

export const getNextBlockCommand: Command<
  'currentSelectionPath',
  'nextBlock',
  {
    path?: string;
  }
> = (ctx, next) => {
  const path = ctx.path ?? ctx.currentSelectionPath;
  assertExists(
    path,
    '`path` is required, you need to pass it in args or ctx before adding this command to the pipeline.'
  );

  const nextBlock = getNextBlock(ctx.std, path);

  if (nextBlock) {
    next({ nextBlock });
  }
};

declare global {
  namespace BlockKit {
    interface CommandContext {
      nextBlock?: BlockElement;
    }

    interface Commands {
      getNextBlock: typeof getNextBlockCommand;
    }
  }
}
