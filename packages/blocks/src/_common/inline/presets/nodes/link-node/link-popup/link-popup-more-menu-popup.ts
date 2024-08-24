import type { EditorHost } from '@maxiee/block-std';
import { WithDisposable } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import type { InlineRange } from '@maxiee/block_inline/types';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { toast } from '../../../../../components/toast.js';
import {
  CopyIcon,
  DeleteIcon,
  OpenIcon,
  UnlinkIcon,
} from '../../../../../icons/index.js';
import type { WorkbenchInlineEditor } from '../../../workbench-inline-specs.js';

@customElement('link-popup-more-menu')
export class LinkPopupMoreMenu extends WithDisposable(LitElement) {
  static override styles = css`
    .link-popup-more-menu {
      box-sizing: border-box;
      padding-bottom: 4px;
    }

    .link-popup-more-menu-container {
      border-radius: 8px;
      padding: 8px;
      background: var(--workbench-background-overlay-panel-color);
      box-shadow: var(--workbench-shadow-2);
    }

    .link-popup-more-menu-container > .menu-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    .link-popup-more-menu-container > .menu-item:hover {
      background: var(--workbench-hover-color);
    }

    .link-popup-more-menu-container > .menu-item:hover.delete {
      background: var(--workbench-background-error-color);
      color: var(--workbench-error-color);
    }
    .link-popup-more-menu > .menu-item:hover.delete > svg {
      color: var(--workbench-error-color);
    }

    .link-popup-more-menu-container > .menu-item svg {
      margin: 0 8px;
    }

    .link-popup-more-menu-container > .divider {
      width: 148px;
      height: 1px;
      margin: 8px;
      background-color: var(--workbench-border-color);
    }
  `;

  @property({ attribute: false })
  accessor inlineEditor!: WorkbenchInlineEditor;

  @property({ attribute: false })
  accessor targetInlineRange!: InlineRange;

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor host!: EditorHost;

  get currentLink() {
    const link = this.inlineEditor.getFormat(this.targetInlineRange).link;
    assertExists(link);
    return link;
  }

  private _openLink() {
    let link = this.currentLink;
    if (!link.match(/^[a-zA-Z]+:\/\//)) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
    this.abortController.abort();
  }

  private _copyUrl() {
    navigator.clipboard.writeText(this.currentLink).catch(console.error);
    toast(this.host, 'Copied link to clipboard');
    this.abortController.abort();
  }

  private _removeLink() {
    if (this.inlineEditor.isValidInlineRange(this.targetInlineRange)) {
      this.inlineEditor.formatText(this.targetInlineRange, {
        link: null,
      });
    }
    this.abortController.abort();
  }

  private _delete() {
    if (this.inlineEditor.isValidInlineRange(this.targetInlineRange)) {
      this.inlineEditor.deleteText(this.targetInlineRange);
    }
    this.abortController.abort();
  }

  override render() {
    return html`
      <div class="link-popup-more-menu">
        <div class="link-popup-more-menu-container">
          <icon-button
            width="126px"
            height="32px"
            class="menu-item open"
            text="Open"
            @click=${() => this._openLink()}
          >
            ${OpenIcon}
          </icon-button>

          <icon-button
            width="126px"
            height="32px"
            class="menu-item copy"
            text="Copy"
            @click=${() => this._copyUrl()}
          >
            ${CopyIcon}
          </icon-button>

          <icon-button
            width="126px"
            height="32px"
            class="menu-item unlink"
            text="Remove link"
            @click=${() => this._removeLink()}
          >
            ${UnlinkIcon}
          </icon-button>

          <div class="divider"></div>

          <icon-button
            width="126px"
            height="32px"
            class="menu-item delete"
            text="Delete"
            @click=${() => this._delete()}
          >
            ${DeleteIcon}
          </icon-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'link-popup-more-menu': LinkPopupMoreMenu;
  }
}
