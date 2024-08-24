import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { ListBlockSchema } from './list-model.js';
import { ListBlockService } from './list-service.js';

export const ListBlockSpec: BlockSpec = {
  schema: ListBlockSchema,
  view: {
    component: literal`workbench-list`,
  },
  service: ListBlockService,
};
