import type { BookmarkBlockModel } from './bookmark-model.js';
import type { BookmarkBlockService } from './bookmark-service.js';

export * from './bookmark-block.js';
export * from './bookmark-model.js';
export * from './bookmark-service.js';

declare global {
  namespace BlockKit {
    interface BlockServices {
      'workbench:bookmark': BookmarkBlockService;
    }
    interface BlockModels {
      'workbench:bookmark': BookmarkBlockModel;
    }
  }
}
