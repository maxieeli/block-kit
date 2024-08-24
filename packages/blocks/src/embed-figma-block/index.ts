import { noop } from '@maxiee/block_global/utils';

import { EmbedFigmaBlockComponent } from './embed-figma-block.js';
import type { EmbedFigmaModel } from './embed-figma-model.js';
import type { EmbedFigmaBlockService } from './embed-figma-service.js';
noop(EmbedFigmaBlockComponent);

export * from './embed-figma-block.js';
export * from './embed-figma-model.js';
export * from './embed-figma-spec.js';

declare global {
  namespace BlockKit {
    interface BlockServices {
      'workbench:embed-figma': EmbedFigmaBlockService;
    }
    interface BlockModels {
      'workbench:embed-figma': EmbedFigmaModel;
    }
  }
}
