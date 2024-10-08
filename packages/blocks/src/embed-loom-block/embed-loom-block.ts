import { assertExists } from '@maxiee/block_global/utils';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';
import { EmbedBlockElement } from '../_common/embed-block-helper/embed-block-element.js';
import { OpenIcon } from '../_common/icons/text.js';
import { getEmbedCardIcons } from '../_common/utils/url.js';
import type { EmbedLoomStyles } from './embed-loom-model.js';
import { type EmbedLoomModel, loomUrlRegex } from './embed-loom-model.js';
import type { EmbedLoomBlockService } from './embed-loom-service.js';
import { LoomIcon, styles } from './styles.js';
import { refreshEmbedLoomUrlData } from './utils.js';

@customElement('workbench-embed-loom-block')
export class EmbedLoomBlockComponent extends EmbedBlockElement<
  EmbedLoomModel,
  EmbedLoomBlockService
> {
  static override styles = styles;

  @state()
  private accessor _isSelected = false;

  @state()
  private accessor _showOverlay = true;

  private _isDragging = false;

  private _isResizing = false;

  override _cardStyle: (typeof EmbedLoomStyles)[number] = 'video';

  @property({ attribute: false })
  accessor loading = false;

  private _selectBlock() {
    const selectionManager = this.host.selection;
    const blockSelection = selectionManager.create('block', {
      blockId: this.blockId,
    });
    selectionManager.setGroup('note', [blockSelection]);
  }

  private _handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.isInSurface) {
      this._selectBlock();
    }
  }

  private _handleDoubleClick(event: MouseEvent) {
    event.stopPropagation();
    this.open();
  }

  open = () => {
    let link = this.model.url;
    if (!link.match(/^[a-zA-Z]+:\/\//)) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
  };

  refreshData = () => {
    refreshEmbedLoomUrlData(this, this.fetchAbortController.signal).catch(
      console.error
    );
  };

  override connectedCallback() {
    super.connectedCallback();

    if (!this.model.videoId) {
      this.doc.withoutTransact(() => {
        const url = this.model.url;
        const urlMatch = url.match(loomUrlRegex);
        if (urlMatch) {
          const [, videoId] = urlMatch;
          this.doc.updateBlock(this.model, {
            videoId,
          });
        }
      });
    }

    if (!this.model.description && !this.model.title) {
      this.doc.withoutTransact(() => {
        this.refreshData();
      });
    }

    this.disposables.add(
      this.model.propsUpdated.on(({ key }) => {
        this.requestUpdate();
        if (key === 'url') {
          this.refreshData();
        }
      })
    );

    // this is required to prevent iframe from capturing pointer events
    this.disposables.add(
      this.std.selection.slots.changed.on(() => {
        this._isSelected =
          !!this.selected?.is('block') || !!this.selected?.is('surface');

        this._showOverlay =
          this._isResizing || this._isDragging || !this._isSelected;
      })
    );
    // this is required to prevent iframe from capturing pointer events
    this.handleEvent('pointerMove', ctx => {
      this._isDragging = ctx.get('pointerState').dragging;
      this._showOverlay =
        this._isResizing || this._isDragging || !this._isSelected;
    });

    if (this.isInSurface) {
      const surface = this.surface;
      assertExists(surface);
      this.disposables.add(
        this.model.propsUpdated.on(() => {
          this.requestUpdate();
        })
      );

      this.edgeless?.slots.elementResizeStart.on(() => {
        this._isResizing = true;
        this._showOverlay = true;
      });

      this.edgeless?.slots.elementResizeEnd.on(() => {
        this._isResizing = false;
        this._showOverlay =
          this._isResizing || this._isDragging || !this._isSelected;
      });
    }
  }

  override renderBlock() {
    const { image, title = 'Loom', description, videoId, style } = this.model;

    this._cardStyle = style;
    this._width = EMBED_CARD_WIDTH[this._cardStyle];
    this._height = EMBED_CARD_HEIGHT[this._cardStyle];

    const loading = this.loading;
    const { LoadingIcon, EmbedCardBannerIcon } = getEmbedCardIcons();
    const titleIcon = loading ? LoadingIcon : LoomIcon;
    const titleText = loading ? 'Loading...' : title;
    const descriptionText = loading ? '' : description;
    const bannerImage =
      !loading && image
        ? html`<object type="image/webp" data=${image} draggable="false">
            ${EmbedCardBannerIcon}
          </object>`
        : EmbedCardBannerIcon;

    return this.renderEmbed(
      () => html`
        <div>
          <div
            class=${classMap({
              'workbench-embed-loom-block': true,
              loading,
              selected: this._isSelected,
            })}
            @click=${this._handleClick}
            @dblclick=${this._handleDoubleClick}
          >
            <div class="workbench-embed-loom-video">
              ${videoId
                ? html`
                    <div class="workbench-embed-loom-video-iframe-container">
                      <iframe
                        src=${`https://www.loom.com/embed/${videoId}?hide_title=true`}
                        frameborder="0"
                        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>

                      <div
                        class=${classMap({
                          'workbench-embed-loom-video-iframe-overlay': true,
                          hide: !this._showOverlay,
                        })}
                      ></div>
                    </div>
                  `
                : bannerImage}
            </div>
            <div class="workbench-embed-loom-content">
              <div class="workbench-embed-loom-content-header">
                <div class="workbench-embed-loom-content-title-icon">
                  ${titleIcon}
                </div>

                <div class="workbench-embed-loom-content-title-text">
                  ${titleText}
                </div>
              </div>

              <div class="workbench-embed-loom-content-description">
                ${descriptionText}
              </div>

              <div class="workbench-embed-loom-content-url" @click=${this.open}>
                <span>loom.com</span>

                <div class="workbench-embed-loom-content-url-icon">
                  ${OpenIcon}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-embed-loom-block': EmbedLoomBlockComponent;
  }
}
