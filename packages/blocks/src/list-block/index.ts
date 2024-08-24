import type { ListBlockModel } from './list-model.js';
import type { ListBlockService } from './list-service.js';

export * from './list-block.js';
export * from './list-model.js';
export * from './list-service.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:list': ListBlockModel;
    }
    interface BlockServices {
      'workbench:list': ListBlockService;
    }
  }
}
