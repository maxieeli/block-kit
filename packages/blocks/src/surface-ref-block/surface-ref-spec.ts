import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { SurfaceRefBlockSchema } from './surface-ref-model.js';
import { SurfaceRefBlockService } from './surface-ref-service.js';

export const PageSurfaceRefBlockSpec: BlockSpec = {
  schema: SurfaceRefBlockSchema,
  service: SurfaceRefBlockService,
  view: {
    component: literal`workbench-surface-ref`,
    widgets: {
      surfaceToolbar: literal`workbench-surface-ref-toolbar`,
    },
  },
};

export const EdgelessSurfaceRefBlockSpec: BlockSpec = {
  schema: SurfaceRefBlockSchema,
  service: SurfaceRefBlockService,
  view: {
    component: literal`workbench-edgeless-surface-ref`,
  },
};
