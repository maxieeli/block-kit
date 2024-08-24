import { WithDisposable } from '@maxiee/block-std';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type { DataViewTableManager } from '../table-view-manager.js';

const styles = css`
  .workbench-database-column-stats {
    width: 100%;
    margin-left: 8px;
    display: flex;
  }
`;

@customElement('workbench-database-column-stats')
export class DataBaseColumnStats extends WithDisposable(LitElement) {
  static override styles = styles;

  @property({ attribute: false })
  accessor view!: DataViewTableManager;

  protected override render() {
    const cols = this.view.columnManagerList;

    return html`
      <div class="workbench-database-column-stats">
        ${repeat(
          cols,
          col => col.id,
          col => {
            return html`<workbench-database-column-stats-cell
              .column="${col}"
            ></workbench-database-column-stats-cell>`;
          }
        )}
      </div>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.disposables.add(
      this.view.slots.update.on(() => {
        this.requestUpdate();
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-database-column-stats': DataBaseColumnStats;
  }
}
