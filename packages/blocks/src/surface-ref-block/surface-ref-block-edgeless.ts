import { BlockElement } from '@maxiee/block-std';
import { nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SurfaceRefBlockModel } from './surface-ref-model.js';

@customElement('workbench-edgeless-surface-ref')
export class EdgelessSurfaceRefBlockComponent extends BlockElement<SurfaceRefBlockModel> {
  override render() {
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-edgeless-surface-ref': EdgelessSurfaceRefBlockComponent;
  }
}
