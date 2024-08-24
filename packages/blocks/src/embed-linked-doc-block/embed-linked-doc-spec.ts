import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { EmbedLinkedDocBlockSchema } from './embed-linked-doc-schema.js';
import { EmbedLinkedDocBlockService } from './embed-linked-doc-service.js';

export const EmbedLinkedDocBlockSpec: BlockSpec = {
  schema: EmbedLinkedDocBlockSchema,
  view: {
    component: literal`workbench-embed-linked-doc-block`,
  },
  service: EmbedLinkedDocBlockService,
};
