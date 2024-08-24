// import { PageRootBlockComponent } from '../page/page-root-block.js';
import { BlockElement } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('workbench-preview-root')
export class PreviewRootBlockComponent extends BlockElement {
  static override styles = css`
    workbench-preview-root {
      display: block;
    }
  `;

  override renderBlock() {
    return html`<div class="workbench-preview-root">
      ${this.host.renderChildren(this.model)}
    </div>`;
  }
}
