import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { DataViewBlockSchema } from './data-view-model.js';
import { DataViewBlockService } from './database-service.js';

export const DataViewBlockSpec: BlockSpec = {
  schema: DataViewBlockSchema,
  service: DataViewBlockService,
  view: {
    component: literal`workbench-data-view`,
  },
};
