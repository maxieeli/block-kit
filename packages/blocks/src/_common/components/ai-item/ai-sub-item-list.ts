import type { EditorHost } from '@maxiee/block-std';
import { WithDisposable } from '@maxiee/block-std';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { EnterIcon } from '../../icons/ai.js';
import { menuItemStyles } from './styles.js';
import type { AIItemConfig, AISubItemConfig } from './types.js';

@customElement('ai-sub-item-list')
export class AISubItemList extends WithDisposable(LitElement) {
  static override styles = css`
    .ai-sub-menu {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 8px;
      min-width: 240px;
      max-height: 320px;
      overflow-y: auto;
      background: var(--workbench-background-overlay-panel-color);
      box-shadow: var(--workbench-shadow-2);
      border-radius: 8px;
      z-index: var(--workbench-z-index-popover);
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      color: var(--workbench-text-primary-color);
      text-align: justify;
      font-feature-settings:
        'clig' off,
        'liga' off;
      font-size: var(--workbench-font-sm);
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      user-select: none;
    }
    ${menuItemStyles}
  `;

  @property({ attribute: false })
  accessor host!: EditorHost;

  @property({ attribute: false })
  accessor item!: AIItemConfig;

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor onClick: (() => void) | undefined;

  private _handleClick = (subItem: AISubItemConfig) => {
    if (subItem.handler) {
      // TODO: add parameters to ai handler
      subItem.handler(this.host);
    }

    this.abortController.abort();
    this.onClick?.();
  };

  override render() {
    if (!this.item.subItem || this.item.subItem.length <= 0) return nothing;
    return html`<div class="ai-sub-menu">
      ${this.item.subItem?.map(
        subItem =>
          html`<div
            class="menu-item"
            @click=${() => this._handleClick(subItem)}
          >
            <div class="item-name">${subItem.type}</div>
            <span class="enter-icon">${EnterIcon}</span>
          </div>`
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-sub-item-list': AISubItemList;
  }
}
