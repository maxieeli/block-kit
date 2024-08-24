import type { DataViewBlockModel } from './data-view-model.js';

export * from './data-view-block.js';
export * from './data-view-model.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:data-view': DataViewBlockModel;
    }
  }
}
