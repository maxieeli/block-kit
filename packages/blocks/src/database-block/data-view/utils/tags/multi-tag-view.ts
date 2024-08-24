import { ShadowlessElement, WithDisposable } from '@maxiee/block-std';
import { css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';

import type { SelectTag } from './multi-tag-select.js';

@customElement('workbench-multi-tag-view')
export class MultiTagView extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    workbench-multi-tag-view {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      min-height: 22px;
    }

    .workbench-select-cell-container * {
      box-sizing: border-box;
    }

    .workbench-select-cell-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      width: 100%;
      font-size: var(--workbench-font-sm);
    }

    .workbench-select-cell-container .select-selected {
      height: 22px;
      font-size: 14px;
      line-height: 22px;
      padding: 0 8px;
      border-radius: 4px;
      white-space: nowrap;
      background: var(--workbench-tag-white);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  @query('.workbench-select-cell-container')
  accessor selectContainer!: HTMLElement;

  @property({ attribute: false })
  accessor value: string[] = [];

  @property({ attribute: false })
  accessor options: SelectTag[] = [];

  override render() {
    const values = this.value;
    const map = new Map<string, SelectTag>(this.options?.map(v => [v.id, v]));
    return html`
      <div contenteditable="false" class="workbench-select-cell-container">
        ${repeat(values, id => {
          const option = map.get(id);
          if (!option) {
            return;
          }
          const style = styleMap({
            backgroundColor: option.color,
          });
          return html`<span class="select-selected" style=${style}
            >${option.value}</span
          >`;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-multi-tag-view': MultiTagView;
  }
}
