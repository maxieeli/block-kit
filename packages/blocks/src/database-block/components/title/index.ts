import { ShadowlessElement, WithDisposable } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import type { InlineRange } from '@maxiee/block_inline';
import type { Text } from '@maxiee/block_store';
import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { RichText } from '../../../_common/components/index.js';
import { getViewportElement } from '../../../_common/utils/query.js';
import type { DatabaseBlockComponent } from '../../database-block.js';

@customElement('workbench-database-title')
export class DatabaseTitle extends WithDisposable(ShadowlessElement) {
  get inlineEditor() {
    assertExists(this.richText.inlineEditor);
    return this.richText.inlineEditor;
  }

  get inlineEditorContainer() {
    return this.inlineEditor.rootElement;
  }

  get topContenteditableElement() {
    const databaseBlock =
      this.closest<DatabaseBlockComponent>('workbench-database');
    return databaseBlock?.topContenteditableElement;
  }

  static override styles = css`
    .workbench-database-title {
      position: relative;
      flex: 1;
    }

    .database-title {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: var(--workbench-text-primary-color);
      font-family: inherit;
      /* overflow-x: scroll; */
      overflow: hidden;
      cursor: text;
    }

    .database-title [data-v-text='true'] {
      display: block;
      word-break: break-all !important;
    }

    .database-title.ellipsis [data-v-text='true'] {
      white-space: nowrap !important;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .workbench-database-title [data-title-empty='true']::before {
      content: 'Untitled';
      position: absolute;
      pointer-events: none;
      color: var(--workbench-text-primary-color);
    }

    .workbench-database-title [data-title-focus='true']::before {
      color: var(--workbench-placeholder-color);
    }
  `;

  @query('rich-text')
  private accessor richText!: RichText;

  @state()
  private accessor isActive = false;

  @property({ attribute: false })
  accessor titleText!: Text;

  @property({ attribute: false })
  accessor readonly!: boolean;

  @property({ attribute: false })
  accessor onPressEnterKey: (() => void) | undefined = undefined;

  @state()
  accessor isComposing = false;

  private _onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.isComposing) {
      // prevent insert v-line
      event.preventDefault();
      // insert new row
      this.onPressEnterKey?.();
      return;
    }
  };

  override firstUpdated() {
    // for title placeholder
    this.titleText.yText.observe(() => {
      this.requestUpdate();
    });

    this.updateComplete
      .then(() => {
        this.disposables.add(
          this.inlineEditor.slots.keydown.on(this._onKeyDown)
        );

        this.disposables.add(
          this.inlineEditor.slots.inputting.on(() => {
            this.isComposing = this.inlineEditor.isComposing;
          })
        );

        let beforeInlineRange: InlineRange | null = null;
        this.disposables.add(
          this.inlineEditor.slots.inlineRangeUpdate.on(([inlineRange]) => {
            if (inlineRange) {
              if (!beforeInlineRange) {
                this.isActive = true;
              }
            } else {
              if (beforeInlineRange) {
                this.isActive = false;
              }
            }
            beforeInlineRange = inlineRange;
          })
        );
      })
      .catch(console.error);
  }

  override async getUpdateComplete(): Promise<boolean> {
    const result = await super.getUpdateComplete();
    await this.richText?.updateComplete;
    return result;
  }

  override render() {
    const isEmpty =
      (!this.titleText || !this.titleText.length) && !this.isComposing;

    const classList = classMap({
      'database-title': true,
      ellipsis: !this.isActive,
    });

    return html`<div class="workbench-database-title">
      <rich-text
        .yText=${this.titleText.yText}
        .inlineEventSource=${this.topContenteditableElement}
        .undoManager=${this.topContenteditableElement?.doc.history}
        .enableFormat=${false}
        .readonly=${this.readonly}
        .verticalScrollContainerGetter=${() =>
          this.topContenteditableElement?.host
            ? getViewportElement(this.topContenteditableElement.host)
            : null}
        class="${classList}"
        data-title-empty="${isEmpty}"
        data-title-focus="${this.isActive}"
        data-block-is-database-title="true"
        title="${this.titleText.toString()}"
      ></rich-text>
      <div class="database-title" style="float:left;height: 0;">Untitled</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-database-title': DatabaseTitle;
  }
}
