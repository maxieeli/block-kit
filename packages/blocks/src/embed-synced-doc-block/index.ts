import { noop } from '@maxiee/block_global/utils';

import { EmbedSyncedDocBlockComponent } from './embed-synced-doc-block.js';
import type { EmbedSyncedDocModel } from './embed-synced-doc-model.js';
import type { EmbedSyncedDocBlockService } from './embed-synced-doc-service.js';

noop(EmbedSyncedDocBlockComponent);

export * from './embed-synced-doc-block.js';
export * from './embed-synced-doc-model.js';
export * from './embed-synced-doc-service.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:embed-synced-doc': EmbedSyncedDocModel;
    }
    interface BlockServices {
      'workbench:embed-synced-doc': EmbedSyncedDocBlockService;
    }
  }
}
