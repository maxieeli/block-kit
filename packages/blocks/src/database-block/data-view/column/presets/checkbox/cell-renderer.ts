import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import {
  checkboxChecked,
  checkboxUnchecked,
  playCheckAnimation,
} from '../../../../../list-block/utils/icons.js';
import { createIcon } from '../../../utils/uni-icon.js';
import { BaseCellRenderer } from '../../base-cell.js';
import { createFromBaseCellRenderer } from '../../renderer.js';
import { checkboxColumnModelConfig } from './define.js';

@customElement('workbench-database-checkbox-cell')
export class CheckboxCell extends BaseCellRenderer<boolean> {
  static override styles = css`
    workbench-database-checkbox-cell {
      display: block;
      width: 100%;
      cursor: pointer;
    }

    .workbench-database-checkbox-container {
      height: 100%;
    }

    .workbench-database-checkbox {
      display: flex;
      align-items: center;
      height: var(--data-view-cell-text-line-height);
      width: 100%;
      position: relative;
    }
    .workbench-database-checkbox svg {
      width: 16px;
      height: 16px;
    }
  `;

  @query('.workbench-database-checkbox')
  private accessor _checkbox!: HTMLDivElement;

  override beforeEnterEditMode() {
    const checked = !this.value;

    this.onChange(checked);
    if (checked) {
      playCheckAnimation(this._checkbox, { left: -2 }).catch(console.error);
    }
    return false;
  }

  override onCopy(_e: ClipboardEvent) {
    _e.preventDefault();
  }

  override onPaste(_e: ClipboardEvent) {
    _e.preventDefault();
  }

  override onCut(_e: ClipboardEvent) {
    _e.preventDefault();
  }

  override render() {
    const checked = this.value ?? false;
    const icon = checked ? checkboxChecked() : checkboxUnchecked();
    return html` <div class="workbench-database-checkbox-container">
      <div
        class="workbench-database-checkbox checkbox ${checked ? 'checked' : ''}"
      >
        ${icon}
      </div>
    </div>`;
  }
}

export const checkboxColumnConfig = checkboxColumnModelConfig.renderConfig({
  icon: createIcon('CheckBoxIcon'),
  cellRenderer: {
    view: createFromBaseCellRenderer(CheckboxCell),
  },
});
