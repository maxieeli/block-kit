import { noop } from '@maxiee/block_global/utils';

import { EmbedLinkedDocBlockComponent } from './embed-linked-doc-block.js';
import type { EmbedLinkedDocModel } from './embed-linked-doc-model.js';
import type { EmbedLinkedDocBlockService } from './embed-linked-doc-service.js';
noop(EmbedLinkedDocBlockComponent);

export * from './embed-linked-doc-block.js';
export * from './embed-linked-doc-model.js';
export * from './embed-linked-doc-service.js';
export * from './embed-linked-doc-spec.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:embed-linked-doc': EmbedLinkedDocModel;
    }
    interface BlockServices {
      'workbench:embed-linked-doc': EmbedLinkedDocBlockService;
    }
  }
}
