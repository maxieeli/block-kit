import type { Command } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import { type DraftModel, toDraftModel } from '@maxiee/block_store';
import { Slice } from '@maxiee/block_store';

export const copySelectedModelsCommand: Command<'selectedModels' | 'onCopy'> = (
  ctx,
  next
) => {
  const models = ctx.selectedModels;
  assertExists(
    models,
    '`selectedModels` is required, you need to use `getSelectedModels` command before adding this command to the pipeline.'
  );

  const drafts = models.map(toDraftModel);

  const traverse = (model: DraftModel) => {
    const isDatabase = model.flavour === 'workbench:database';
    const children = isDatabase
      ? model.children
      : model.children.filter(child => {
          const idx = drafts.findIndex(m => m.id === child.id);
          return idx >= 0;
        });

    children.forEach(child => {
      const idx = drafts.findIndex(m => m.id === child.id);
      if (idx >= 0) {
        drafts.splice(idx, 1);
      }
      traverse(child);
    });
    model.children = children;
  };
  drafts.forEach(traverse);

  const slice = Slice.fromModels(ctx.std.doc, drafts);

  ctx.std.clipboard
    .copy(slice)
    .then(() => ctx.onCopy?.())
    .catch(console.error);
  return next();
};

declare global {
  namespace BlockKit {
    interface CommandContext {
      onCopy?: () => void;
    }
    interface Commands {
      copySelectedModels: typeof copySelectedModelsCommand;
    }
  }
}