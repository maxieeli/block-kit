import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { createIcon } from '../../../utils/uni-icon.js';
import { BaseCellRenderer } from '../../base-cell.js';
import { createFromBaseCellRenderer } from '../../renderer.js';
import { imageColumnModelConfig } from './define.js';

@customElement('workbench-database-image-cell')
export class TextCell extends BaseCellRenderer<string> {
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

export const imageColumnConfig = imageColumnModelConfig.renderConfig({
  icon: createIcon('ImageIcon'),
  cellRenderer: {
    view: createFromBaseCellRenderer(TextCell),
  },
});
