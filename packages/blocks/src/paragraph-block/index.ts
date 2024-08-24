import type { ParagraphBlockModel } from './paragraph-model.js';
import type { ParagraphBlockService } from './paragraph-service.js';

export * from './paragraph-block.js';
export * from './paragraph-model.js';
export * from './paragraph-service.js';

declare global {
  namespace BlockKit {
    interface BlockServices {
      'workbench:paragraph': ParagraphBlockService;
    }
    interface BlockModels {
      'workbench:paragraph': ParagraphBlockModel;
    }
  }
}
