import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { Rect } from '../../../../_common/utils/index.js';

@customElement('workbench-drop-indicator')
export class DropIndicator extends LitElement {
  static override styles = css`
    .workbench-drop-indicator {
      position: absolute;
      top: 0;
      left: 0;
      background: var(--workbench-primary-color);
      transition-property: height, transform;
      transition-duration: 100ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 0s;
      transform-origin: 0 0;
      pointer-events: none;
      z-index: 2;
    }
  `;

  @property({ attribute: false })
  accessor rect: Rect | null = null;

  override render() {
    if (!this.rect) {
      return null;
    }
    const { left, top, width, height } = this.rect;
    const style = styleMap({
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    });
    return html`<div class="workbench-drop-indicator" style=${style}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-drop-indicator': DropIndicator;
  }
}
