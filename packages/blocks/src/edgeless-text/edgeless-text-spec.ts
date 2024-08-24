import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { EdgelessTextBlockSchema } from './edgeless-text-model.js';
import { EdgelessTextBlockService } from './edgeless-text-service.js';

export const EdgelessTextBlockSpec: BlockSpec = {
  schema: EdgelessTextBlockSchema,
  view: {
    component: literal`workbench-edgeless-text`,
  },
  service: EdgelessTextBlockService,
};
