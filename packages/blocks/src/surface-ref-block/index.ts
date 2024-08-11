import type { SurfaceRefBlockModel } from './surface-ref-model.js';
import type { SurfaceRefBlockService } from './surface-ref-service.js';

export * from './surface-ref-block.js';
export * from './surface-ref-block-edgeless.js';
export * from './surface-ref-model.js';
export * from './surface-ref-service.js';

declare global {
  namespace BlockKit {
    interface BlockModels {
      'workbench:surface-ref': SurfaceRefBlockModel;
    }
    interface BlockServices {
      'workbench:surface-ref': SurfaceRefBlockService;
    }
  }
}
