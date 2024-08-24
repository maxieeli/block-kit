import '../../../../../components/button.js';
import '../../../../../components/tooltip/tooltip.js';

import type { BlockElement } from '@maxiee/block-std';
import { WithDisposable } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import type { InlineRange } from '@maxiee/block_inline/types';
import { computePosition, flip, inline, offset, shift } from '@floating-ui/dom';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import type { EmbedOptions } from '../../../../../../root-block/root-service.js';
import type { IconButton } from '../../../../../components/button.js';
import { createLitPortal } from '../../../../../components/portal.js';
import { toast } from '../../../../../components/toast.js';
import { BLOCK_ID_ATTR } from '../../../../../consts.js';
import { BookmarkIcon, MoreVerticalIcon } from '../../../../../icons/index.js';
import {
  ConfirmIcon,
  CopyIcon,
  EditIcon,
  EmbedWebIcon,
  LinkIcon,
  UnlinkIcon,
} from '../../../../../icons/text.js';
import { isValidUrl, normalizeUrl } from '../../../../../utils/url.js';
import type { WorkbenchInlineEditor } from '../../../workbench-inline-specs.js';
import { LinkPopupMoreMenu } from './link-popup-more-menu-popup.js';
import { linkPopupStyle } from './styles.js';

@customElement('link-popup')
export class LinkPopup extends WithDisposable(LitElement) {
  private get _rootService() {
    return this.std.spec.getService('workbench:page');
  }

  get host() {
    return this.blockElement.host;
  }

  get std() {
    return this.blockElement.std;
  }

  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockElement>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get currentText() {
    return this.inlineEditor.yTextString.slice(
      this.targetInlineRange.index,
      this.targetInlineRange.index + this.targetInlineRange.length
    );
  }

  get currentLink() {
    const link = this.inlineEditor.getFormat(this.targetInlineRange).link;
    assertExists(link);
    return link;
  }

  private get _isBookmarkAllowed() {
    const blockElement = this.blockElement;
    const schema = blockElement.doc.schema;
    const parent = blockElement.doc.getParent(blockElement.model);
    assertExists(parent);
    const bookmarkSchema = schema.flavourSchemaMap.get('workbench:bookmark');
    assertExists(bookmarkSchema);
    const parentSchema = schema.flavourSchemaMap.get(parent.flavour);
    assertExists(parentSchema);

    try {
      schema.validateSchema(bookmarkSchema, parentSchema);
    } catch {
      return false;
    }

    return true;
  }

  private get _canConvertToEmbedView() {
    return this._embedOptions?.viewType === 'embed';
  }

  static override styles = linkPopupStyle;

  private _bodyOverflowStyle = '';

  private _moreMenuAbortController: AbortController | null = null;

  private _embedOptions: EmbedOptions | null = null;

  @property()
  accessor type: 'create' | 'edit' | 'view' = 'create';

  @property({ attribute: false })
  accessor inlineEditor!: WorkbenchInlineEditor;

  @property({ attribute: false })
  accessor targetInlineRange!: InlineRange;

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @query('#text-input')
  accessor textInput: HTMLInputElement | null = null;

  @query('#link-input')
  accessor linkInput: HTMLInputElement | null = null;

  @query('.workbench-link-popover-container')
  accessor popupContainer!: HTMLDivElement;

  @query('.mock-selection-container')
  accessor mockSelectionContainer!: HTMLDivElement;

  @query('.workbench-confirm-button')
  accessor confirmButton: IconButton | null = null;

  private _onConfirm() {
    if (!this.inlineEditor.isValidInlineRange(this.targetInlineRange)) return;

    assertExists(this.linkInput);
    const linkInputValue = this.linkInput.value;
    if (!linkInputValue || !isValidUrl(linkInputValue)) return;

    const link = normalizeUrl(linkInputValue);

    if (this.type === 'create') {
      this.inlineEditor.formatText(this.targetInlineRange, {
        link: link,
        reference: null,
      });
      this.inlineEditor.setInlineRange(this.targetInlineRange);
      const textSelection = this.host.selection.find('text');
      assertExists(textSelection);
      this.host.rangeManager?.syncTextSelectionToRange(textSelection);
    } else if (this.type === 'edit') {
      const text = this.textInput?.value ?? link;
      this.inlineEditor.insertText(this.targetInlineRange, text, {
        link: link,
        reference: null,
      });
      this.inlineEditor.setInlineRange({
        index: this.targetInlineRange.index,
        length: text.length,
      });
      const textSelection = this.host.selection.find('text');
      assertExists(textSelection);
      this.host.rangeManager?.syncTextSelectionToRange(textSelection);
    }

    this.abortController.abort();
  }

  private _copyUrl() {
    navigator.clipboard.writeText(this.currentLink).catch(console.error);
    toast(this.host, 'Copied link to clipboard');
    this.abortController.abort();
  }

  private _convertToCardView() {
    if (!this.inlineEditor.isValidInlineRange(this.targetInlineRange)) {
      return;
    }

    let targetFlavour = 'workbench:bookmark';

    if (this._embedOptions && this._embedOptions.viewType === 'card') {
      targetFlavour = this._embedOptions.flavour;
    }

    const blockElement = this.blockElement;
    const url = this.currentLink;
    const title = this.currentText;
    const props = {
      url,
      title: title === url ? '' : title,
    };
    const doc = blockElement.doc;
    const parent = doc.getParent(blockElement.model);
    assertExists(parent);
    const index = parent.children.indexOf(blockElement.model);
    doc.addBlock(targetFlavour as never, props, parent, index + 1);

    const totalTextLength = this.inlineEditor.yTextLength;
    const inlineTextLength = this.targetInlineRange.length;
    if (totalTextLength === inlineTextLength) {
      doc.deleteBlock(blockElement.model);
    } else {
      this.inlineEditor.formatText(this.targetInlineRange, { link: null });
    }

    this.abortController.abort();
  }

  private _convertToEmbedView() {
    if (!this._embedOptions || this._embedOptions.viewType !== 'embed') {
      return;
    }

    const { flavour } = this._embedOptions;
    const url = this.currentLink;

    const blockElement = this.blockElement;
    const doc = blockElement.doc;
    const parent = doc.getParent(blockElement.model);
    assertExists(parent);
    const index = parent.children.indexOf(blockElement.model);

    doc.addBlock(flavour as never, { url }, parent, index + 1);

    const totalTextLength = this.inlineEditor.yTextLength;
    const inlineTextLength = this.targetInlineRange.length;
    if (totalTextLength === inlineTextLength) {
      doc.deleteBlock(blockElement.model);
    } else {
      this.inlineEditor.formatText(this.targetInlineRange, { link: null });
    }

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

  private _onKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault();
      this._onConfirm();
    }
  }

  private _updateConfirmBtn() {
    assertExists(this.confirmButton);
    const link = this.linkInput?.value;
    this.confirmButton.disabled = !(link && isValidUrl(link));
    this.confirmButton.requestUpdate();
  }

  private _confirmBtnTemplate() {
    return html`<icon-button
      class="workbench-confirm-button"
      @click=${this._onConfirm}
      >${ConfirmIcon}</icon-button
    >`;
  }

  private _createTemplate() {
    this.updateComplete
      .then(() => {
        this.linkInput?.focus();

        this._updateConfirmBtn();
      })
      .catch(console.error);

    return html`
      <div class="workbench-link-popover create">
        <input
          id="link-input"
          class="workbench-link-popover-input"
          type="text"
          spellcheck="false"
          placeholder="Paste or type a link"
          @input=${this._updateConfirmBtn}
        />
        <span class="workbench-link-popover-dividing-line"></span>
        ${this._confirmBtnTemplate()}
      </div>
    `;
  }

  private _toggleMoreMenu() {
    if (this._moreMenuAbortController) {
      this._moreMenuAbortController.abort();
      this._moreMenuAbortController = null;
      return;
    }
    this._moreMenuAbortController = new AbortController();
    const linkPopupMoreMenu = new LinkPopupMoreMenu();
    linkPopupMoreMenu.abortController = this.abortController;
    linkPopupMoreMenu.inlineEditor = this.inlineEditor;
    linkPopupMoreMenu.targetInlineRange = this.targetInlineRange;
    linkPopupMoreMenu.host = this.blockElement.host;

    createLitPortal({
      template: linkPopupMoreMenu,
      container: this.popupContainer,
      computePosition: {
        referenceElement: this.popupContainer,
        placement: 'top-end',
        middleware: [flip()],
        autoUpdate: true,
      },
      abortController: this._moreMenuAbortController,
    });
  }

  private _viewTemplate() {
    this._embedOptions = this._rootService.getEmbedBlockOptions(
      this.currentLink
    );

    return html`
      <div class="workbench-link-popover view">
        <div class="workbench-link-preview" @click=${() => this._copyUrl()}>
          <span>${this.currentLink}</span>
        </div>

        <icon-button size="32px" @click=${() => this._copyUrl()}>
          ${CopyIcon}
          <workbench-tooltip .offset=${12}>${'Click to copy link'}</workbench-tooltip>
        </icon-button>

        <icon-button
          size="32px"
          data-testid="edit"
          @click=${() => {
            this.type = 'edit';
          }}
        >
          ${EditIcon}
          <workbench-tooltip .offset=${12}>Edit</workbench-tooltip>
        </icon-button>

        <span class="workbench-link-popover-dividing-line"></span>

        ${this._isBookmarkAllowed
          ? html`
              <div class="workbench-link-popover-view-selector">
                <icon-button
                  size="24px"
                  class="workbench-link-popover-view-selector-button link current-view"
                  hover="false"
                >
                  ${LinkIcon}
                  <workbench-tooltip .offset=${12}
                    >${'Inline view'}</workbench-tooltip
                  >
                </icon-button>

                <icon-button
                  size="24px"
                  data-testid="link-to-card"
                  class="workbench-link-popover-view-selector-button card"
                  hover="false"
                  @click=${() => this._convertToCardView()}
                >
                  ${BookmarkIcon}
                  <workbench-tooltip .offset=${12}>${'Card view'}</workbench-tooltip>
                </icon-button>

                ${this._canConvertToEmbedView
                  ? html` <icon-button
                      size="24px"
                      class="workbench-link-popover-view-selector-button embed"
                      hover="false"
                      @click=${() => this._convertToEmbedView()}
                    >
                      ${EmbedWebIcon}
                      <workbench-tooltip .offset=${12}
                        >${'Embed view'}</workbench-tooltip
                      >
                    </icon-button>`
                  : nothing}
              </div>

              <span class="workbench-link-popover-dividing-line"></span>
            `
          : nothing}

        <icon-button data-testid="unlink" @click=${() => this._removeLink()}>
          ${UnlinkIcon}
          <workbench-tooltip .offset=${12}>Remove</workbench-tooltip>
        </icon-button>

        <span class="workbench-link-popover-dividing-line"></span>

        <icon-button size="24px" @click=${() => this._toggleMoreMenu()}>
          ${MoreVerticalIcon}
          <workbench-tooltip .offset=${12}>More</workbench-tooltip>
        </icon-button>
      </div>
    `;
  }

  private _editTemplate() {
    this.updateComplete
      .then(() => {
        assertExists(this.textInput);
        this.textInput.value = this.currentText;
        assertExists(this.linkInput);
        this.linkInput.value = this.currentLink;

        this.textInput.select();

        this._updateConfirmBtn();
      })
      .catch(console.error);

    return html`
      <div class="workbench-link-edit-popover">
        <div class="workbench-edit-text-area">
          <input
            class="workbench-edit-text-input"
            id="text-input"
            type="text"
            placeholder="Enter text"
            @input=${this._updateConfirmBtn}
          />
          <span class="workbench-link-popover-dividing-line"></span>
          <label class="workbench-edit-text-text" for="text-input">Text</label>
        </div>
        <div class="workbench-edit-link-area">
          <input
            id="link-input"
            class="workbench-edit-link-input"
            type="text"
            spellcheck="false"
            placeholder="Paste or type a link"
            @input=${this._updateConfirmBtn}
          />
          <span class="workbench-link-popover-dividing-line"></span>
          <label class="workbench-edit-link-text" for="link-input">Link</label>
        </div>
        ${this._confirmBtnTemplate()}
      </div>
    `;
  }

  protected override firstUpdated() {
    if (!this.linkInput) return;

    this._disposables.addFromEvent(this.linkInput, 'copy', e => {
      e.stopPropagation();
    });
    this._disposables.addFromEvent(this.linkInput, 'cut', e => {
      e.stopPropagation();
    });
    this._disposables.addFromEvent(this.linkInput, 'paste', e => {
      e.stopPropagation();
    });
  }

  override connectedCallback() {
    super.connectedCallback();

    if (this.targetInlineRange.length === 0) {
      throw new Error('Cannot toggle link popup on empty range');
    }

    if (this.type === 'edit' || this.type === 'create') {
      // disable body scroll
      this._bodyOverflowStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.disposables.add({
        dispose: () => {
          document.body.style.overflow = this._bodyOverflowStyle;
        },
      });
    }

    const parent = this.blockElement.doc.getParent(this.blockElement.model);
    assertExists(parent);
    this.disposables.add(
      parent.childrenUpdated.on(() => {
        const children = parent.children;
        if (children.includes(this.blockElement.model)) return;
        this.abortController.abort();
      })
    );
  }

  override updated() {
    assertExists(this.popupContainer);
    const range = this.inlineEditor.toDomRange(this.targetInlineRange);
    assertExists(range);

    if (this.type !== 'view') {
      const domRects = range.getClientRects();

      Object.values(domRects).forEach(domRect => {
        const mockSelection = document.createElement('div');
        mockSelection.classList.add('mock-selection');
        mockSelection.style.left = `${domRect.left}px`;
        mockSelection.style.top = `${domRect.top}px`;
        mockSelection.style.width = `${domRect.width}px`;
        mockSelection.style.height = `${domRect.height}px`;

        assertExists(this.mockSelectionContainer);
        this.mockSelectionContainer.append(mockSelection);
      });
    }

    const visualElement = {
      getBoundingClientRect: () => range.getBoundingClientRect(),
      getClientRects: () => range.getClientRects(),
    };
    computePosition(visualElement, this.popupContainer, {
      middleware: [
        offset(10),
        inline(),
        shift({
          padding: 6,
        }),
      ],
    })
      .then(({ x, y }) => {
        const popupContainer = this.popupContainer;
        if (!popupContainer) return;
        popupContainer.style.left = `${x}px`;
        popupContainer.style.top = `${y}px`;
      })
      .catch(console.error);
  }

  override render() {
    const mask =
      this.type === 'edit' || this.type === 'create'
        ? html`<div
            class="workbench-link-popover-overlay-mask"
            @click=${() => {
              this.abortController.abort();
              this.host.selection.clear();
            }}
          ></div>`
        : nothing;

    const popover =
      this.type === 'create'
        ? this._createTemplate()
        : this.type === 'view'
          ? this._viewTemplate()
          : this._editTemplate();

    return html`
      <div class="overlay-root">
        ${mask}
        <div class="workbench-link-popover-container" @keydown=${this._onKeydown}>
          ${popover}
        </div>
        <div class="mock-selection-container"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'link-popup': LinkPopup;
  }
}
