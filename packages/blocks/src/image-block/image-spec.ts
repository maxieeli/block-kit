import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { ImageBlockSchema } from './image-model.js';
import { ImageBlockService } from './image-service.js';

export const ImageBlockSpec: BlockSpec = {
  schema: ImageBlockSchema,
  service: ImageBlockService,
  view: {
    component: literal`workbench-image`,
    widgets: {
      imageToolbar: literal`workbench-image-toolbar-widget`,
    },
  },
};
