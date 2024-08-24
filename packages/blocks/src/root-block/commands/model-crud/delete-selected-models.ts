import type { Command } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';

export const deleteSelectedModelsCommand: Command<'selectedModels'> = (
  ctx,
  next
) => {
  const models = ctx.selectedModels;
  assertExists(
    models,
    '`selectedModels` is required, you need to use `getSelectedModels` command before adding this command to the pipeline.'
  );

  models.forEach(model => {
    ctx.std.doc.deleteBlock(model);
  });

  return next();
};

declare global {
  namespace BlockKit {
    interface Commands {
      deleteSelectedModels: typeof deleteSelectedModelsCommand;
    }
  }
}
