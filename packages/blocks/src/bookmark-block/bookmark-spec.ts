import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { BookmarkBlockSchema } from './bookmark-model.js';
import { BookmarkBlockService } from './bookmark-service.js';

export const BookmarkBlockSpec: BlockSpec = {
  schema: BookmarkBlockSchema,
  view: {
    component: literal`workbench-bookmark`,
  },
  service: BookmarkBlockService,
};
