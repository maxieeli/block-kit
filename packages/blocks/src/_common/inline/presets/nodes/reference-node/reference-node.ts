import type { BlockElement } from '@maxiee/block-std';
import { ShadowlessElement, WithDisposable } from '@maxiee/block-std';
import type { Slot } from '@maxiee/block_global/utils';
import { assertExists } from '@maxiee/block_global/utils';
import {
  type DeltaInsert,
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '@maxiee/block_inline';
import type { Doc, DocMeta } from '@maxiee/block_store';
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import type { RootBlockComponent } from '../../../../../root-block/types.js';
import { HoverController } from '../../../../components/hover/controller.js';
import { Peekable } from '../../../../components/peekable.js';
import { BLOCK_ID_ATTR } from '../../../../consts.js';
import { FontDocIcon, FontLinkedDocIcon } from '../../../../icons/text.js';
import {
  getModelByElement,
  getRootByElement,
} from '../../../../utils/query.js';
import type { WorkbenchTextAttributes } from '../../workbench-inline-specs.js';
import { workbenchTextStyles } from '../workbench-text.js';
import { DEFAULT_DOC_NAME, REFERENCE_NODE } from '../consts.js';
import type { ReferenceNodeConfig } from './reference-config.js';
import { toggleReferencePopup } from './reference-popup.js';

export type RefNodeSlots = {
  docLinkClicked: Slot<{ docId: string; blockId?: string }>;
  tagClicked: Slot<{ tagId: string }>;
};

declare module '@maxiee/blocks' {
  interface PeekViewService {
    peek(target: WorkbenchReference): void;
  }
}

@customElement('workbench-reference')
@Peekable({ action: false })
export class WorkbenchReference extends WithDisposable(ShadowlessElement) {
  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<WorkbenchTextAttributes>>(
      `[${INLINE_ROOT_ATTR}]`
    );
    assertExists(inlineRoot);
    return inlineRoot.inlineEditor;
  }

  get selfInlineRange() {
    const selfInlineRange = this.inlineEditor.getInlineRangeFromElement(this);
    assertExists(selfInlineRange);
    return selfInlineRange;
  }

  get blockElement() {
    const blockElement = this.inlineEditor.rootElement.closest<BlockElement>(
      `[${BLOCK_ID_ATTR}]`
    );
    assertExists(blockElement);
    return blockElement;
  }

  get std() {
    const std = this.blockElement.std;
    assertExists(std);
    return std;
  }

  get doc() {
    const doc = this.config.doc;
    assertExists(doc, '`reference-node` need `Doc`.');
    return doc;
  }

  get customIcon() {
    return this.config.customIcon;
  }

  get customTitle() {
    return this.config.customTitle;
  }

  get customContent() {
    return this.config.customContent;
  }

  static override styles = css`
    .workbench-reference {
      white-space: normal;
      word-break: break-word;
      color: var(--workbench-text-primary-color);
      fill: var(--workbench-icon-color);
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      padding: 1px 2px 1px 0;
    }
    .workbench-reference:hover {
      background: var(--workbench-hover-color);
    }

    .workbench-reference[data-selected='true'] {
      background: var(--workbench-hover-color);
    }

    .workbench-reference-title {
      margin-left: 4px;
      border-bottom: 0.5px solid var(--workbench-divider-color);
      transition: border 0.2s ease-out;
    }
    .workbench-reference-title:hover {
      border-bottom: 0.5px solid var(--workbench-icon-color);
    }
  `;

  private _refAttribute: NonNullable<WorkbenchTextAttributes['reference']> = {
    type: 'LinkedPage',
    pageId: '0',
  };

  private _whenHover: HoverController = new HoverController(
    this,
    ({ abortController }) => {
      if (this.doc.readonly) {
        return null;
      }

      const selection = this.std.selection;
      const textSelection = selection.find('text');
      if (
        !!textSelection &&
        (!!textSelection.to || !!textSelection.from.length)
      ) {
        return null;
      }

      const blockSelections = selection.filter('block');
      if (blockSelections.length) {
        return null;
      }

      return {
        template: toggleReferencePopup(
          this,
          this.inlineEditor,
          this.selfInlineRange,
          this.refMeta?.title ?? DEFAULT_DOC_NAME,
          abortController
        ),
      };
    },
    { enterDelay: 500 }
  );

  @property({ type: Object })
  accessor delta: DeltaInsert<WorkbenchTextAttributes> = {
    insert: ZERO_WIDTH_SPACE,
    attributes: {},
  };

  @property({ type: Boolean })
  accessor selected = false;

  @property({ attribute: false })
  accessor config!: ReferenceNodeConfig;

  // Since the linked doc may be deleted, the `_refMeta` could be undefined.
  @state()
  accessor refMeta: DocMeta | undefined = undefined;

  private _updateRefMeta = (doc: Doc) => {
    const refAttribute = this.delta.attributes?.reference;
    assertExists(refAttribute, 'Failed to get reference attribute!');
    this._refAttribute = refAttribute;
    const refMeta = doc.collection.meta.docMetas.find(
      doc => doc.id === refAttribute.pageId
    );
    this.refMeta = refMeta
      ? {
          ...refMeta,
        }
      : undefined;
  };

  private _onClick() {
    if (!this.config.interactable) return;

    const refMeta = this.refMeta;
    const model = getModelByElement(this);
    if (!refMeta) {
      // The doc is deleted
      console.warn('The doc is deleted', this._refAttribute.pageId);
      return;
    }
    if (refMeta.id === model.doc.id) {
      // the doc is the current doc.
      return;
    }
    const targetDocId = refMeta.id;
    const rootModel = model.doc.root;
    assertExists(rootModel);
    const rootElement = getRootByElement(this) as RootBlockComponent;
    assertExists(rootElement);
    rootElement.slots.docLinkClicked.emit({ docId: targetDocId });
  }

  override connectedCallback() {
    super.connectedCallback();

    assertExists(this.config, '`reference-node` need `ReferenceNodeConfig`.');

    if (this.delta.insert !== REFERENCE_NODE) {
      console.error(
        `Reference node must be initialized with '${REFERENCE_NODE}', but got '${this.delta.insert}'`
      );
    }

    const doc = this.doc;
    this._disposables.add(
      doc.collection.slots.docUpdated.on(() => this._updateRefMeta(doc))
    );

    this.updateComplete
      .then(() => {
        // observe yText update
        this.disposables.add(
          this.inlineEditor.slots.textChange.on(() => this._updateRefMeta(doc))
        );
      })
      .catch(console.error);
  }

  override willUpdate(_changedProperties: Map<PropertyKey, unknown>) {
    super.willUpdate(_changedProperties);

    const doc = this.doc;
    this._updateRefMeta(doc);
  }

  override render() {
    const refMeta = this.refMeta;
    const isDeleted = !refMeta;

    const attributes = this.delta.attributes;
    assertExists(attributes, 'Failed to get attributes!');

    const type = attributes.reference?.type;
    assertExists(type, 'Unable to get reference type!');

    const title = this.customTitle
      ? this.customTitle(this)
      : isDeleted
        ? 'Deleted doc'
        : refMeta.title.length > 0
          ? refMeta.title
          : DEFAULT_DOC_NAME;
    const icon = this.customIcon
      ? this.customIcon(this)
      : type === 'LinkedPage'
        ? FontLinkedDocIcon
        : FontDocIcon;

    const style = workbenchTextStyles(
      attributes,
      isDeleted
        ? {
            color: 'var(--workbench-text-disable-color)',
            textDecoration: 'line-through',
            fill: 'var(--workbench-text-disable-color)',
          }
        : {}
    );

    const content = this.customContent
      ? this.customContent(this)
      : html`${icon}<span data-title=${title} class="workbench-reference-title"
            >${title}</span
          >`;

    // we need to add `<v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text>` in an
    // embed element to make sure inline range calculation is correct
    return html`<span
      ${this.config.interactable ? ref(this._whenHover.setReference) : ''}
      data-selected=${this.selected}
      class="workbench-reference"
      style=${style}
      @click=${this._onClick}
      >${content}<v-text .str=${ZERO_WIDTH_NON_JOINER}></v-text
    ></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-reference': WorkbenchReference;
  }
}
