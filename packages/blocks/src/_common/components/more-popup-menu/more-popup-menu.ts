import { WithDisposable } from '@maxiee/block-std';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { stopPropagation } from '../../utils/event.js';

@customElement('more-popup-menu')
export class MorePopupMenu extends WithDisposable(LitElement) {
  static override styles = css`
    .more-popup-menu {
      box-sizing: border-box;
    }

    .more-popup-menu-container {
      border-radius: 8px;
      padding: 8px;
      background: var(--workbench-background-overlay-panel-color);
      box-shadow: var(--workbench-shadow-1);
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    }

    .more-popup-menu-container > .menu-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      font-size: var(--workbench-font-sm);
      font-weight: 400;
      line-height: 22px;
      color: var(--workbench-text-primary-color);
      border-radius: 4px;
    }

    .more-popup-menu-container > .menu-item.delete:hover icon-button {
      background: var(--workbench-background-error-color);
      color: var(--workbench-error-color);
    }
    .more-popup-menu-container > .menu-item.delete:hover icon-button > svg {
      color: var(--workbench-error-color);
    }

    .more-popup-menu-container > .menu-item svg {
      margin: 0 8px;
      scale: 0.88;
    }

    .more-popup-menu-container > .divider {
      width: 100%;
      height: 0.5px;
      margin: 8px 0;
      background-color: var(--workbench-border-color);
    }
  `;

  @property({ attribute: false })
  accessor items!: TemplateResult[];

  override render() {
    return html`
      <div class="more-popup-menu">
        <div class="more-popup-menu-container" @pointerdown=${stopPropagation}>
          ${this.items}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'more-popup-menu': MorePopupMenu;
  }
}
