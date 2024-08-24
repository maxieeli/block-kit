import type { FrameBlockModel } from './frame-model.js';

export * from './frame-block.js';
export * from './frame-model.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:frame': FrameBlockModel;
    }
  }
}
