import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { EmbedLoomBlockSchema } from './embed-loom-schema.js';
import { EmbedLoomBlockService } from './embed-loom-service.js';

export const EmbedLoomBlockSpec: BlockSpec = {
  schema: EmbedLoomBlockSchema,
  view: {
    component: literal`workbench-embed-loom-block`,
  },
  service: EmbedLoomBlockService,
};
