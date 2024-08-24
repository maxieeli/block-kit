import { WidgetElement } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { PageRootBlockComponent, RootBlockModel } from '../../index.js';

export const WORKBENCH_VIEWPORT_OVERLAY_WIDGET = 'workbench-viewport-overlay-widget';

@customElement(WORKBENCH_VIEWPORT_OVERLAY_WIDGET)
export class WorkbenchViewportOverlayWidget extends WidgetElement<
  RootBlockModel,
  PageRootBlockComponent
> {
  static override styles = css`
    .workbench-viewport-overlay-widget {
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      pointer-events: none;
      z-index: calc(var(--workbench-z-index-popover) - 1);
    }

    .workbench-viewport-overlay-widget.lock {
      pointer-events: auto;
    }
  `;

  @state()
  private accessor _lockViewport = false;

  lock() {
    this._lockViewport = true;
  }

  unlock() {
    this._lockViewport = false;
  }

  toggleLock() {
    this._lockViewport = !this._lockViewport;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.handleEvent(
      'dragStart',
      () => {
        return this._lockViewport;
      },
      { global: true }
    );
    this.handleEvent(
      'pointerDown',
      () => {
        return this._lockViewport;
      },
      { global: true }
    );
    this.handleEvent(
      'click',
      () => {
        return this._lockViewport;
      },
      { global: true }
    );
  }

  override render() {
    const classes = classMap({
      'workbench-viewport-overlay-widget': true,
      lock: this._lockViewport,
    });
    const style = styleMap({
      width: `${this._lockViewport ? '100vw' : '0'}`,
      height: `${this._lockViewport ? '100%' : '0'}`,
    });
    return html` <div class=${classes} style=${style}></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_VIEWPORT_OVERLAY_WIDGET]: WorkbenchViewportOverlayWidget;
  }
}
