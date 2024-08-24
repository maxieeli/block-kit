import type { CodeBlockModel } from './code-model.js';

export * from './code-block.js';
export * from './code-model.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:code': CodeBlockModel;
    }
  }
}
