import type { Command } from '@maxiee/block-std';
import type { BlockElement } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';

function getPrevSibling(std: BlockKit.Std, path: string) {
  const view = std.view;
  const blockElement = view.getBlock(path);
  if (!blockElement) return null;
  const prev = std.doc.getPrev(blockElement.model);
  if (!prev) return null;
  return view.getBlock(prev.id);
}

function getPrevBlock(std: BlockKit.Std, path: string) {
  const view = std.view;

  const prev: BlockElement | null = getPrevSibling(std, path);

  if (!prev) {
    return null;
  }

  const block = view.getBlock(path);
  if (!block) return null;

  if (prev && prev.blockId !== path) {
    return prev;
  }

  return null;
}

export const getPrevBlockCommand: Command<
  'currentSelectionPath',
  'prevBlock',
  {
    path?: string;
  }
> = (ctx, next) => {
  const path = ctx.path ?? ctx.currentSelectionPath;
  assertExists(
    path,
    '`path` is required, you need to pass it in args or ctx before adding this command to the pipeline.'
  );

  const prevBlock = getPrevBlock(ctx.std, path);

  if (prevBlock) {
    next({ prevBlock });
  }
};

declare global {
  namespace BlockKit {
    interface CommandContext {
      prevBlock?: BlockElement;
    }

    interface Commands {
      getPrevBlock: typeof getPrevBlockCommand;
    }
  }
}
