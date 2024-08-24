import { WidgetElement } from '@maxiee/block-std';
import { nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import { createCustomModal } from './custom-modal.js';

export const WORKBENCH_MODAL_WIDGET = 'workbench-modal-widget';

@customElement(WORKBENCH_MODAL_WIDGET)
export class WorkbenchModalWidget extends WidgetElement {
  open(options: Parameters<typeof createCustomModal>[0]) {
    return createCustomModal(options, this.ownerDocument.body);
  }

  override render() {
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_MODAL_WIDGET]: WorkbenchModalWidget;
  }
}
