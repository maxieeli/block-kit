import { noop } from '@maxiee/block_global/utils';

import { EmbedGithubBlockComponent } from './embed-github-block.js';
import type { EmbedGithubModel } from './embed-github-model.js';
import type { EmbedGithubBlockService } from './embed-github-service.js';
noop(EmbedGithubBlockComponent);

export * from './embed-github-block.js';
export * from './embed-github-model.js';
export * from './embed-github-service.js';
export * from './embed-github-spec.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:embed-github': EmbedGithubModel;
    }
    interface BlockServices {
      'workbench:embed-github': EmbedGithubBlockService;
    }
  }
}
