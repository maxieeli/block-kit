import { ShadowlessElement, WithDisposable } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { humanFileSize } from '../../_common/utils/math.js';
import type { ImageBlockComponent } from '../image-block.js';
import { FailedImageIcon, ImageIcon, LoadingIcon } from '../styles.js';

export const SURFACE_IMAGE_CARD_WIDTH = 220;
export const SURFACE_IMAGE_CARD_HEIGHT = 122;
export const NOTE_IMAGE_CARD_WIDTH = 752;
export const NOTE_IMAGE_CARD_HEIGHT = 78;

@customElement('workbench-image-block-card')
export class WorkbenchImageCard extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    .workbench-image-block-card-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .workbench-image-block-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--workbench-background-secondary-color, #f4f4f5);
      border-radius: 8px;
      border: 1px solid var(--workbench-background-tertiary-color, #eee);
      padding: 12px;
    }

    .workbench-image-block-card-content {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--workbench-placeholder-color);
      text-align: justify;
      font-family: var(--workbench-font-family);
      font-size: var(--workbench-font-sm);
      font-style: normal;
      font-weight: 600;
      line-height: var(--workbench-line-height);
      user-select: none;
    }

    .workbench-image-card-size {
      overflow: hidden;
      padding-top: 12px;
      color: var(--workbench-text-secondary-color);
      text-overflow: ellipsis;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      user-select: none;
    }
  `;

  @property({ attribute: false })
  accessor block!: ImageBlockComponent;

  override render() {
    const { isInSurface, loading, error, model } = this.block;

    const width = isInSurface
      ? `${SURFACE_IMAGE_CARD_WIDTH}px`
      : `${NOTE_IMAGE_CARD_WIDTH}px`;

    const height = isInSurface
      ? `${SURFACE_IMAGE_CARD_HEIGHT}px`
      : `${NOTE_IMAGE_CARD_HEIGHT}px`;

    const rotate = isInSurface ? model.rotate : 0;

    const cardStyleMap = styleMap({
      transform: `rotate(${rotate}deg)`,
      transformOrigin: 'center',
      width,
      height,
    });

    const titleIcon = loading
      ? LoadingIcon
      : error
        ? FailedImageIcon
        : ImageIcon;

    const titleText = loading
      ? 'Loading image...'
      : error
        ? 'Image loading failed.'
        : 'Image';

    const size =
      !!model.size && model.size > 0
        ? humanFileSize(model.size, true, 0)
        : null;

    return html`
      <div class="workbench-image-block-card-container">
        <div class="workbench-image-block-card drag-target" style=${cardStyleMap}>
          <div class="workbench-image-block-card-content">
            ${titleIcon}
            <span class="workbench-image-block-card-title-text">${titleText}</span>
          </div>
          <div class="workbench-image-card-size">${size}</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-image-block-card': WorkbenchImageCard;
  }
}
