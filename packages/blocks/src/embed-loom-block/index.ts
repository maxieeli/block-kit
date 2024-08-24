import { noop } from '@maxiee/block_global/utils';

import { EmbedLoomBlockComponent } from './embed-loom-block.js';
import type { EmbedLoomModel } from './embed-loom-model.js';
import type { EmbedLoomBlockService } from './embed-loom-service.js';
noop(EmbedLoomBlockComponent);

export * from './embed-loom-block.js';
export * from './embed-loom-model.js';
export * from './embed-loom-service.js';
export * from './embed-loom-spec.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:embed-loom': EmbedLoomModel;
    }
    interface BlockServices {
      'workbench:embed-loom': EmbedLoomBlockService;
    }
  }
}
