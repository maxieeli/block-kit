/// <reference types="vite/client" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BlockComponent } from '../_common/components/block-component.js';
import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import type { DividerBlockModel } from './divider-model.js';
import { dividerBlockStyles } from './styles.js';

@customElement('workbench-divider')
export class DividerBlockComponent extends BlockComponent<DividerBlockModel> {
  static override styles = dividerBlockStyles;

  override connectedCallback() {
    super.connectedCallback();

    this.contentEditable = 'false';

    this.handleEvent('click', () => {
      this.host.selection.set([
        this.host.selection.create('block', {
          blockId: this.blockId,
        }),
      ]);
    });
  }

  override renderBlock() {
    const children = html`<div
      class="workbench-block-children-container"
      style="padding-left: ${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px"
    >
      ${this.renderChildren(this.model)}
    </div>`;

    return html`
      <div class="workbench-divider-block-container">
        <hr />

        ${children}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-divider': DividerBlockComponent;
  }
}
