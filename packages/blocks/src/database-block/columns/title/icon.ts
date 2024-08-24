import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseCellRenderer } from '../../data-view/column/index.js';

@customElement('data-view-header-area-icon')
export class IconCell extends BaseCellRenderer<string> {
  static override styles = css`
    workbench-database-image-cell {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    workbench-database-image-cell img {
      width: 20px;
      height: 20px;
    }
  `;

  override render() {
    return html`<img src=${this.value ?? ''}></img>`;
  }
}
