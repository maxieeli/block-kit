import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { AttachmentBlockSchema } from './attachment-model.js';
import { AttachmentBlockService } from './attachment-service.js';

export const AttachmentBlockSpec: BlockSpec = {
  schema: AttachmentBlockSchema,
  view: {
    component: literal`workbench-attachment`,
  },
  service: AttachmentBlockService,
};
