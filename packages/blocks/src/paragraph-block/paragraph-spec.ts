import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { ParagraphBlockSchema } from './paragraph-model.js';
import { ParagraphBlockService } from './paragraph-service.js';

export const ParagraphBlockSpec: BlockSpec = {
  schema: ParagraphBlockSchema,
  view: {
    component: literal`workbench-paragraph`,
  },
  service: ParagraphBlockService,
};
