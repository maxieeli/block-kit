import { ShadowlessElement, WithDisposable } from '@maxiee/block-std';
import { css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';

import type { DataViewColumnManager } from '../../../../data-view-manager.js';
import type { DataViewTableManager } from '../../table-view-manager.js';

@customElement('workbench-data-view-column-preview')
export class DataViewColumnPreview extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    workbench-data-view-column-preview {
      pointer-events: none;
      display: block;
    }
  `;

  @property({ attribute: false })
  accessor tableViewManager!: DataViewTableManager;

  @property({ attribute: false })
  accessor column!: DataViewColumnManager;

  @property({ attribute: false })
  accessor table!: HTMLElement;

  private renderGroup(rows: string[]) {
    const columnIndex = this.tableViewManager.columnGetIndex(this.column.id);
    return html`
      <div
        style="background-color: var(--workbench-background-primary-color);border-top: 1px solid var(--workbench-border-color);box-shadow: var(--workbench-shadow-2);"
      >
        <workbench-database-header-column
          .tableViewManager="${this.tableViewManager}"
          .column="${this.column}"
        ></workbench-database-header-column>
        ${repeat(rows, (id, index) => {
          const height = this.table.querySelector(
            `workbench-database-cell-container[data-row-id="${id}"]`
          )?.clientHeight;
          const style = styleMap({
            height: height + 'px',
          });
          return html`<div
            style="border-top: 1px solid var(--workbench-border-color)"
          >
            <div style="${style}">
              <workbench-database-cell-container
                .column="${this.column}"
                .view="${this.tableViewManager}"
                .rowId="${id}"
                .columnId="${this.column.id}"
                .rowIndex="${index}"
                .columnIndex="${columnIndex}"
              ></workbench-database-cell-container>
            </div>
          </div>`;
        })}
      </div>
      <div style="height: 45px;"></div>
    `;
  }

  override render() {
    const groupHelper = this.tableViewManager.groupHelper;
    if (!groupHelper) {
      const rows = this.tableViewManager.rows;
      return this.renderGroup(rows);
    }
    return groupHelper.groups.map(group => {
      return html`
        <div style="height: 44px;"></div>
        ${this.renderGroup(group.rows)}
      `;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-data-view-column-preview': DataViewColumnPreview;
  }
}
