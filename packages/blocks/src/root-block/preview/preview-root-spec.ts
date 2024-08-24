import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { PageRootService } from '../page/page-root-service.js';
import { RootBlockSchema } from '../root-model.js';

export const PreviewPageSpec: BlockSpec = {
  schema: RootBlockSchema,
  service: PageRootService,
  view: {
    component: literal`workbench-preview-root`,
  },
};
