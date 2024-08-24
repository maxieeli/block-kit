import './components/image-toolbar.js';

import { WidgetElement } from '@maxiee/block-std';
import { limitShift, shift } from '@floating-ui/dom';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HoverController } from '../../../_common/components/hover/controller.js';
import { PAGE_HEADER_HEIGHT } from '../../../_common/consts.js';
import type { ImageBlockComponent } from '../../../image-block/image-block.js';
import type { ImageBlockModel } from '../../../image-block/index.js';
import { commonConfig, moreMenuConfig } from './config.js';
import type { ImageConfigItem, MoreMenuConfigItem } from './type.js';

export const WORKBENCH_IMAGE_TOOLBAR_WIDGET = 'workbench-image-toolbar-widget';

@customElement(WORKBENCH_IMAGE_TOOLBAR_WIDGET)
export class WorkbenchImageToolbarWidget extends WidgetElement<
  ImageBlockModel,
  ImageBlockComponent
> {
  private _hoverController: HoverController | null = null;

  private _isActivated = false;

  config: ImageConfigItem[] = [];

  moreMenuConfig: MoreMenuConfigItem[] = [];

  private _setHoverController = () => {
    this._hoverController = null;
    this._hoverController = new HoverController(
      this,
      ({ abortController }) => {
        const imageBlock = this.blockElement;
        const selection = this.host.selection;

        const textSelection = selection.find('text');
        if (
          !!textSelection &&
          (!!textSelection.to || !!textSelection.from.length)
        ) {
          return null;
        }

        const blockSelections = selection.filter('block');
        if (
          blockSelections.length > 1 ||
          (blockSelections.length === 1 &&
            blockSelections[0].blockId !== imageBlock.blockId)
        ) {
          return null;
        }

        const imageContainer = imageBlock.resizeImg ?? imageBlock.imageCard;
        if (!imageContainer) {
          return null;
        }

        return {
          template: html`<workbench-image-toolbar
            .blockElement=${imageBlock}
            .abortController=${abortController}
            .config=${this.config}
            .moreMenuConfig=${this.moreMenuConfig}
            .onActiveStatusChange=${(active: boolean) => {
              this._isActivated = active;
              if (!active && !this._hoverController?.isHovering) {
                this._hoverController?.abort();
              }
            }}
          ></workbench-image-toolbar>`,
          computePosition: {
            referenceElement: imageContainer,
            placement: 'right-start',
            middleware: [
              shift({
                crossAxis: true,
                padding: {
                  top: PAGE_HEADER_HEIGHT + 12,
                  bottom: 12,
                  right: 12,
                },
                limiter: limitShift(),
              }),
            ],
            autoUpdate: true,
          },
        };
      },
      { allowMultiple: true }
    );

    const imageBlock = this.blockElement;
    this._hoverController.setReference(imageBlock);
    this._hoverController.onAbort = () => {
      // If the more menu is opened, don't close it.
      if (this._isActivated) return;
      this._hoverController?.abort();
      return;
    };
  };

  clearConfig = () => {
    this.config = [];
    this.moreMenuConfig = [];
    return this;
  };

  addConfigItems = (item: ImageConfigItem[], index?: number) => {
    if (index === undefined) {
      this.config.push(...item);
      return this;
    }

    this.config.splice(index, 0, ...item);
    return this;
  };

  addMoreMenuItems = (item: MoreMenuConfigItem[], index?: number) => {
    if (index === undefined) {
      this.moreMenuConfig.push(...item);
      return this;
    }

    this.moreMenuConfig.splice(index, 0, ...item);
    return this;
  };

  buildDefaultConfig = () => {
    this.clearConfig()
      .addConfigItems(commonConfig)
      .addMoreMenuItems(moreMenuConfig);
    return this;
  };

  override firstUpdated() {
    if (!this.config.length || !this.moreMenuConfig.length) {
      this.buildDefaultConfig();
    }
    this._setHoverController();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_IMAGE_TOOLBAR_WIDGET]: WorkbenchImageToolbarWidget;
  }
}
