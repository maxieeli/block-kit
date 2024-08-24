import {
  RangeManager,
  ShadowlessElement,
  WithDisposable,
} from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { RichText } from '../../../../_common/components/rich-text/rich-text.js';
import type { GroupElementModel } from '../../../../surface-block/element-model/group.js';
import { Bound } from '../../../../surface-block/index.js';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';

@customElement('edgeless-group-title-editor')
export class EdgelessGroupTitleEditor extends WithDisposable(
  ShadowlessElement
) {
  get inlineEditor() {
    assertExists(this.richText.inlineEditor);
    return this.richText.inlineEditor;
  }

  get inlineEditorContainer() {
    return this.inlineEditor.rootElement;
  }

  @query('rich-text')
  accessor richText!: RichText;

  @property({ attribute: false })
  accessor group!: GroupElementModel;

  @property({ attribute: false })
  accessor edgeless!: EdgelessRootBlockComponent;

  private _unmount() {
    // dispose in advance to avoid execute `this.remove()` twice
    this.disposables.dispose();
    this.group.showTitle = true;
    this.edgeless.service.selection.set({
      elements: [this.group.id],
      editing: false,
    });
    this.remove();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute(RangeManager.rangeSyncExcludeAttr, 'true');
  }

  override async getUpdateComplete(): Promise<boolean> {
    const result = await super.getUpdateComplete();
    await this.richText?.updateComplete;
    return result;
  }

  override firstUpdated(): void {
    const dispatcher = this.edgeless.dispatcher;
    assertExists(dispatcher);

    this.updateComplete
      .then(() => {
        this.inlineEditor.selectAll();

        this.group.showTitle = false;

        this.inlineEditor.slots.renderComplete.on(() => {
          this.requestUpdate();
        });

        this.disposables.add(
          dispatcher.add('keyDown', ctx => {
            const state = ctx.get('keyboardState');
            if (state.raw.key === 'Enter' && !state.raw.isComposing) {
              this._unmount();
              return true;
            }
            requestAnimationFrame(() => {
              this.requestUpdate();
            });
            return false;
          })
        );
        this.disposables.add(
          this.edgeless.service.viewport.viewportUpdated.on(() => {
            this.requestUpdate();
          })
        );

        this.disposables.add(dispatcher.add('click', () => true));
        this.disposables.add(dispatcher.add('doubleClick', () => true));
        this.disposables.addFromEvent(
          this.inlineEditorContainer,
          'blur',
          () => {
            this._unmount();
          }
        );
      })
      .catch(console.error);
  }

  override render() {
    const viewport = this.edgeless.service.viewport;
    const bound = Bound.deserialize(this.group.xywh);
    const [x, y] = viewport.toViewCoord(bound.x, bound.y);
    const inlineEditorStyle = styleMap({
      transformOrigin: 'top left',
      borderRadius: '35px',
      width: 'fit-content',
      maxHeight: '30px',
      lineHeight: '20px',
      padding: '4px 10px',
      fontSize: '14px',
      position: 'absolute',
      left: x + 'px',
      top: y - 36 + 'px',
      minWidth: '8px',
      fontFamily: 'var(--workbench-font-family)',
      color: 'var(--workbench-text-primary-color)',
      background: 'var(--workbench-white-10)',
      outline: 'none',
      zIndex: '1',
      border: `1px solid
        var(--workbench-primary-color)`,
      boxShadow: 'var(--workbench-active-shadow)',
    });
    return html`<rich-text
      .yText=${this.group.title}
      .enableFormat=${false}
      .enableAutoScrollHorizontally=${false}
      style=${inlineEditorStyle}
    ></rich-text>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-group-title-editor': EdgelessGroupTitleEditor;
  }
}
