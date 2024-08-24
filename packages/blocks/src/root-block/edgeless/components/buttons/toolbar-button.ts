import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { EdgelessToolIconButton } from './tool-icon-button.js';

@customElement('edgeless-toolbar-button')
export class EdgelessToolbarButton extends EdgelessToolIconButton {
  static override styles = css`
    .icon-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      color: var(--workbench-icon-color);
      cursor: pointer;
    }

    .icon-container.active-mode-color[active] {
      color: var(--workbench-primary-color);
    }

    .icon-container.active-mode-background[active] {
      background: var(--workbench-hover-color);
    }

    .icon-container[disabled] {
      pointer-events: none;
      cursor: not-allowed;
    }

    .icon-container[coming] {
      cursor: not-allowed;
      color: var(--workbench-text-disable-color);
    }
  `;

  override render() {
    return html` ${super.render()} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-toolbar-button': EdgelessToolbarButton;
  }
}
