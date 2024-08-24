import { assertExists } from '@maxiee/block_global/utils';
import { flip, offset } from '@floating-ui/dom';
import { html } from 'lit';
import { createRef, ref, type RefOrCallback } from 'lit/directives/ref.js';

import { createLitPortal } from '../../_common/components/portal.js';
import {
  BookmarkIcon,
  CaptionIcon,
  EditIcon,
  EmbedWebIcon,
  LinkIcon,
  MoreIcon,
  ViewIcon,
} from '../../_common/icons/index.js';
import { stopPropagation } from '../../_common/utils/event.js';
import type { AttachmentBlockComponent } from '../attachment-block.js';
import type { AttachmentBlockModel } from '../attachment-model.js';
import { allowEmbed, convertToEmbed } from '../embed.js';
import { MoreMenu } from './more-menu.js';
import { RenameModal } from './rename-model.js';
import { styles } from './styles.js';

export function AttachmentOptionsTemplate({
  anchor,
  model,
  showCaption,
  downloadAttachment,
  abortController,
  ref: refOrCallback = createRef<HTMLDivElement>(),
}: {
  anchor: AttachmentBlockComponent;
  model: AttachmentBlockModel;
  downloadAttachment: (model: AttachmentBlockModel) => void | Promise<void>;
  showCaption: () => void;
  abortController: AbortController;
  ref?: RefOrCallback;
}) {
  let containerEl: Element | undefined;
  const refCallback = (el: Element | undefined) => {
    containerEl = el;

    if (!refCallback) return;
    // See also https://github.com/lit/lit/blob/c134604f178e36444261d83eabe9e578c1ed90c4/packages/lit-html/src/directives/ref.ts
    typeof refOrCallback === 'function'
      ? refOrCallback(el)
      : ((
          refOrCallback as {
            // RefInternal
            value: Element | undefined;
          }
        ).value = el);
  };

  const disableEmbed = !allowEmbed(model, anchor.service.maxFileSize);
  const readonly = model.doc.readonly;
  let moreMenuAbortController: AbortController | null = null;
  return html`<style>
      ${styles}
    </style>

    <div
      ${ref(refCallback)}
      class="workbench-attachment-options"
      @pointerdown=${stopPropagation}
    >
      <icon-button size="32px" ?hidden=${true}>
        ${ViewIcon}
        <workbench-tooltip .offset=${12}>Preview</workbench-tooltip>
      </icon-button>
      <div class="divider" ?hidden=${true}></div>

      <icon-button size="32px" ?hidden=${true}>
        ${LinkIcon}
        <workbench-tooltip .offset=${12}>Turn into Link view</workbench-tooltip>
      </icon-button>

      <icon-button
        size="32px"
        ?hidden=${!model.embed}
        ?disabled=${readonly}
        @click="${() => {
          model.doc.updateBlock(model, { embed: false });
          abortController.abort();
        }}"
      >
        ${BookmarkIcon}
        <workbench-tooltip .offset=${12}>Turn into Card view</workbench-tooltip>
      </icon-button>

      <icon-button
        size="32px"
        ?hidden=${model.embed}
        ?disabled=${readonly || disableEmbed}
        @click="${() => {
          convertToEmbed(model, anchor.service.maxFileSize);
          abortController.abort();
        }}"
      >
        ${EmbedWebIcon}
        <workbench-tooltip .offset=${12}>Turn into Embed view</workbench-tooltip>
      </icon-button>
      <div class="divider"></div>

      <icon-button
        size="32px"
        ?hidden=${readonly}
        @click="${() => {
          abortController.abort();
          const renameAbortController = new AbortController();
          createLitPortal({
            template: RenameModal({
              editorHost: anchor.host,
              model,
              abortController: renameAbortController,
            }),
            computePosition: {
              referenceElement: anchor,
              placement: 'top-start',
              middleware: [flip(), offset(4)],
              // It has a overlay mask, so we don't need to update the position.
              // autoUpdate: true,
            },
            abortController: renameAbortController,
          });
        }}"
      >
        ${EditIcon}
        <workbench-tooltip .offset=${12}>Rename</workbench-tooltip>
      </icon-button>
      <icon-button
        size="32px"
        ?hidden=${readonly}
        @click=${() => {
          showCaption();
        }}
      >
        ${CaptionIcon}
        <workbench-tooltip .offset=${12}>Caption</workbench-tooltip>
      </icon-button>
      <div class="divider" ?hidden=${readonly}></div>
      <icon-button
        size="32px"
        class="more-button"
        @click=${() => {
          if (moreMenuAbortController) {
            moreMenuAbortController.abort();
            moreMenuAbortController = null;
            return;
          }
          moreMenuAbortController = new AbortController();

          assertExists(containerEl);
          createLitPortal({
            container: containerEl,
            template: MoreMenu({ model, abortController, downloadAttachment }),
            abortController: moreMenuAbortController,
            computePosition: {
              referenceElement: containerEl,
              placement: 'top-end',
              middleware: [flip()],
            },
          });
        }}
      >
        ${MoreIcon}
        <workbench-tooltip .offset=${12}>More</workbench-tooltip>
      </icon-button>
    </div>`;
}