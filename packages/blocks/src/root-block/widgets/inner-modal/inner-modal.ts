import { WidgetElement } from '@maxiee/block-std';
import {
  autoUpdate,
  computePosition,
  type FloatingElement,
  type ReferenceElement,
  size,
} from '@floating-ui/dom';
import { nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

export const WORKBENCH_INNER_MODAL_WIDGET = 'workbench-inner-modal-widget';

@customElement(WORKBENCH_INNER_MODAL_WIDGET)
export class WorkbenchInnerModalWidget extends WidgetElement {
  private _getTarget?: () => ReferenceElement;

  setTarget(fn: () => ReferenceElement) {
    this._getTarget = fn;
  }

  get target(): ReferenceElement {
    if (this._getTarget) {
      return this._getTarget();
    }
    return document.body;
  }

  open(
    modal: FloatingElement,
    ops: { onClose?: () => void }
  ): { close(): void } {
    const cancel = autoUpdate(this.target, modal, () => {
      computePosition(this.target, modal, {
        middleware: [
          size({
            apply: ({ rects }) => {
              Object.assign(modal.style, {
                left: `${rects.reference.x}px`,
                top: `${rects.reference.y}px`,
                width: `${rects.reference.width}px`,
                height: `${rects.reference.height}px`,
              });
            },
          }),
        ],
      }).catch(console.error);
    });
    const close = () => {
      modal.remove();
      ops.onClose?.();
      cancel();
    };
    return { close };
  }

  override render() {
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_INNER_MODAL_WIDGET]: WorkbenchInnerModalWidget;
  }
}
