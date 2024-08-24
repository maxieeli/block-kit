import { BlockElement, type BlockService } from '@maxiee/block-std';
import type { BlockModel } from '@maxiee/block_store';
import { html, nothing } from 'lit';
import { query } from 'lit/decorators.js';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';

import type { BlockCaptionEditor } from './block-caption.js';

export class BlockComponent<
  Model extends BlockModel = BlockModel,
  Service extends BlockService = BlockService,
  WidgetName extends string = string,
> extends BlockElement<Model, Service, WidgetName> {
  get captionEditor() {
    if (!this.useCaptionEditor || !this._captionEditor)
      throw new Error(
        'Oops! Please enable useCaptionEditor before accessing captionEditor'
      );
    return this._captionEditor;
  }

  @query('.workbench-block-component > block-caption-editor')
  private accessor _captionEditor!: BlockCaptionEditor | null;

  protected accessor useCaptionEditor = false;

  protected accessor showBlockSelection = true;

  protected accessor blockContainerStyles: StyleInfo | undefined = undefined;

  constructor() {
    super();
    this.addRenderer(this._renderWithWidget);
  }

  private _renderWithWidget(content: unknown) {
    const style = styleMap({
      position: 'relative',
      ...this.blockContainerStyles,
    });

    return html`<div style=${style} class="workbench-block-component">
      ${content}
      ${this.useCaptionEditor
        ? html`<block-caption-editor .block=${this}></block-caption-editor>`
        : nothing}
      ${this.showBlockSelection
        ? html`<workbench-block-selection .block=${this}></workbench-block-selection>`
        : nothing}
    </div>`;
  }
}
