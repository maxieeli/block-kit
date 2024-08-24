import { noop } from '@maxiee/block_global/utils';

import { EmbedYoutubeBlockComponent } from './embed-youtube-block.js';
import type { EmbedYoutubeModel } from './embed-youtube-model.js';
import type { EmbedYoutubeBlockService } from './embed-youtube-service.js';
noop(EmbedYoutubeBlockComponent);

export * from './embed-youtube-block.js';
export * from './embed-youtube-model.js';
export * from './embed-youtube-service.js';
export * from './embed-youtube-spec.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:embed-youtube': EmbedYoutubeModel;
    }
    interface BlockServices {
      'workbench:embed-youtube': EmbedYoutubeBlockService;
    }
  }
}
