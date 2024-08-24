import { WithDisposable } from '@maxiee/block-std';
import { assertExists, noop } from '@maxiee/block_global/utils';
import { flip, offset } from '@floating-ui/dom';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { createLitPortal } from '../../../../_common/components/index.js';
import { MorePopupMenu } from '../../../../_common/components/more-popup-menu/more-popup-menu.js';
import { MoreVerticalIcon } from '../../../../_common/icons/edgeless.js';
import type { CodeBlockComponent } from '../../../../code-block/code-block.js';
import type { CodeToolbarItem, CodeToolbarMoreItem } from '../types.js';
import { CodeToolbarItemRenderer, MoreMenuRenderer } from '../utils.js';

@customElement('workbench-code-toolbar')
export class WorkbenchCodeToolbar extends WithDisposable(LitElement) {
  static override styles = css`
    :host {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
    }

    .code-toolbar-container {
      display: flex;
      gap: 4px;
      box-sizing: border-box;
      padding: 4px;
    }

    .code-toolbar-button {
      background-color: var(--workbench-background-primary-color);
      color: var(--workbench-icon-color);
      box-shadow: var(--workbench-shadow-1);
      border-radius: 4px;
    }

    .code-toolbar-button:hover {
      background: var(--workbench-hover-color-filled);
    }

    .code-toolbar-button[hover] {
      background: var(--workbench-hover-color-filled);
    }
  `;

  @state()
  private accessor _moreMenuOpen = false;

  @query('.code-toolbar-button.more-button')
  private accessor _moreButton!: HTMLElement;

  private _popMenuAbortController: AbortController | null = null;

  private _currentOpenMenu: AbortController | null = null;

  @property({ attribute: false })
  accessor blockElement!: CodeBlockComponent;

  @property({ attribute: false })
  accessor items!: CodeToolbarItem[];

  @property({ attribute: false })
  accessor moreItems!: CodeToolbarMoreItem[];

  @property({ attribute: false })
  accessor onActiveStatusChange: (active: boolean) => void = noop;

  private _toggleMoreMenu() {
    if (
      this._currentOpenMenu &&
      !this._currentOpenMenu.signal.aborted &&
      this._currentOpenMenu === this._popMenuAbortController
    ) {
      this.closeCurrentMenu();
      this._moreMenuOpen = false;
      return;
    }

    this.closeCurrentMenu();
    this._popMenuAbortController = new AbortController();
    this._popMenuAbortController.signal.addEventListener('abort', () => {
      this._moreMenuOpen = false;
      this.onActiveStatusChange(false);
    });
    this.onActiveStatusChange(true);

    this._currentOpenMenu = this._popMenuAbortController;

    const moreMenu = new MorePopupMenu();
    const moreItems = MoreMenuRenderer(
      this.blockElement,
      this._popMenuAbortController,
      this.moreItems
    );
    moreMenu.items = moreItems;

    assertExists(this._moreButton);
    createLitPortal({
      template: moreMenu,
      container: this._moreButton,
      computePosition: {
        referenceElement: this._moreButton,
        placement: 'bottom-start',
        middleware: [flip(), offset(4)],
        autoUpdate: true,
      },
      abortController: this._popMenuAbortController,
      closeOnClickAway: true,
    });
    this._moreMenuOpen = true;
  }

  closeCurrentMenu = () => {
    if (this._currentOpenMenu && !this._currentOpenMenu.signal.aborted) {
      this._currentOpenMenu.abort();
      this._currentOpenMenu = null;
    }
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.closeCurrentMenu();
  }

  override render() {
    const items = CodeToolbarItemRenderer(
      this.items,
      this.blockElement,
      this.closeCurrentMenu
    );

    return html`<div class="code-toolbar-container">
      ${items}
      <icon-button
        class="code-toolbar-button more-button"
        data-testid="more-button"
        size="24px"
        ?disabled=${this.blockElement.readonly}
        @click=${() => this._toggleMoreMenu()}
      >
        ${MoreVerticalIcon}
        ${!this._moreMenuOpen
          ? html`<workbench-tooltip>More</workbench-tooltip>`
          : nothing}
      </icon-button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-code-toolbar': WorkbenchCodeToolbar;
  }
}
