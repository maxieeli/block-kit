import type { DividerBlockModel } from './divider-model.js';

export * from './divider-block.js';
export * from './divider-model.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:divider': DividerBlockModel;
    }
  }
}
