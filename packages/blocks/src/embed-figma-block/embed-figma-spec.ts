import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { EmbedFigmaBlockSchema } from './embed-figma-schema.js';
import { EmbedFigmaBlockService } from './embed-figma-service.js';

export const EmbedFigmaBlockSpec: BlockSpec = {
  schema: EmbedFigmaBlockSchema,
  view: {
    component: literal`workbench-embed-figma-block`,
  },
  service: EmbedFigmaBlockService,
};
