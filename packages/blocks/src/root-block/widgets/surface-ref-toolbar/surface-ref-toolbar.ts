import { WidgetElement } from '@maxiee/block-std';
import { offset, shift } from '@floating-ui/dom';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { HoverController } from '../../../_common/components/hover/controller.js';
import { isPeekable, peek } from '../../../_common/components/peekable.js';
import { toast } from '../../../_common/components/toast.js';
import { PAGE_HEADER_HEIGHT } from '../../../_common/consts.js';
import { EdgelessModeIcon } from '../../../_common/icons/edgeless.js';
import {
  CaptionIcon,
  CenterPeekIcon,
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
} from '../../../_common/icons/text.js';
import { downloadBlob } from '../../../_common/utils/filesys.js';
import type {
  SurfaceRefBlockComponent,
  SurfaceRefBlockModel,
} from '../../../surface-ref-block/index.js';
import { edgelessToBlob, writeImageBlobToClipboard } from './utils.js';

export const WORKBENCH_SURFACE_REF_TOOLBAR = 'workbench-surface-ref-toolbar';

@customElement(WORKBENCH_SURFACE_REF_TOOLBAR)
export class WorkbenchSurfaceRefToolbar extends WidgetElement<
  SurfaceRefBlockModel,
  SurfaceRefBlockComponent
> {
  private _hoverController = new HoverController(
    this,
    ({ abortController }) => {
      const surfaceRefBlock = this.blockElement;
      const selection = this.host.selection;

      const textSelection = selection.find('text');
      if (
        !!textSelection &&
        (!!textSelection.to || !!textSelection.from.length)
      ) {
        return null;
      }

      const blockSelections = selection.filter('block');
      if (
        blockSelections.length > 1 ||
        (blockSelections.length === 1 &&
          blockSelections[0].blockId !== surfaceRefBlock.blockId)
      ) {
        return null;
      }

      return {
        template: SurfaceRefToolbarOptions({
          blockElement: this.blockElement,
          model: this.blockElement.model,
          abortController,
        }),
        computePosition: {
          referenceElement: this.blockElement,
          placement: 'top-start',
          middleware: [
            offset({
              mainAxis: 12,
              crossAxis: 10,
            }),
            shift({
              crossAxis: true,
              padding: {
                top: PAGE_HEADER_HEIGHT + 12,
                bottom: 12,
                right: 12,
              },
            }),
          ],
          autoUpdate: true,
        },
      };
    }
  );

  override connectedCallback() {
    super.connectedCallback();

    this._hoverController.setReference(this.blockElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_SURFACE_REF_TOOLBAR]: WorkbenchSurfaceRefToolbar;
  }
}

function SurfaceRefToolbarOptions(options: {
  blockElement: SurfaceRefBlockComponent;
  model: SurfaceRefBlockModel;
  abortController: AbortController;
}) {
  const { blockElement, model, abortController } = options;
  const readonly = model.doc.readonly;
  const hasValidReference = !!blockElement.referenceModel;

  return html`
    <style>
      :host {
        z-index: 1;
      }
      .surface-ref-toolbar-container {
        display: flex;
        box-sizing: border-box;
        box-shadow: var(--workbench-shadow-2);
        border-radius: 8px;
        list-style: none;
        padding: 4px 8px;
        gap: 4px;
        align-items: center;
        background-color: var(--workbench-background-overlay-panel-color);
        margin: 0;
      }
      .delete-button:hover {
        background: var(--workbench-background-error-color);
        color: var(--workbench-error-color);
      }
      .delete-button:hover > svg {
        color: var(--workbench-error-color);
      }

      .divider {
        width: 1px;
        height: 24px;
        background-color: var(--workbench-border-color);
        margin: 0 8px;
      }

      .view-in-edgeless-button {
        font-size: 12px;
        color: var(--workbench-text-secondary-color);
        font-weight: 600;
        gap: 2px;
      }
    </style>

    <div class="surface-ref-toolbar-container">
      <icon-button
        ?hidden=${!hasValidReference || readonly}
        class="view-in-edgeless-button"
        text="View in Edgeless"
        width="fit-content"
        @click=${() => blockElement.viewInEdgeless()}
        >${EdgelessModeIcon}
      </icon-button>

      <div
        class="divider"
        ?hidden=${readonly}
        style=${styleMap({
          display: hasValidReference ? undefined : 'none',
        })}
      ></div>

      <icon-button
        size="32px"
        ?hidden=${readonly}
        @click=${() => {
          abortController.abort();
          blockElement.captionElement.show();
        }}
      >
        ${CaptionIcon}

        <workbench-tooltip tip-position="top">Caption</workbench-tooltip>
      </icon-button>

      <icon-button
        size="32px"
        ?hidden=${!hasValidReference}
        @click=${() => {
          const referencedModel = blockElement.referenceModel;

          if (!referencedModel) return;

          edgelessToBlob(blockElement.host, {
            surfaceRefBlock: blockElement,
            surfaceRenderer: blockElement.surfaceRenderer,
            edgelessElement: referencedModel,
            blockContainer: blockElement.portal,
          })
            .then(blob => {
              const fileName =
                'title' in referencedModel
                  ? referencedModel.title?.toString() ?? 'Edgeless Content'
                  : 'Edgeless Content';

              downloadBlob(blob, fileName);
            })
            .catch(err => {
              console.error(err);
            });
        }}
      >
        ${DownloadIcon}

        <workbench-tooltip tip-position="top">Download</workbench-tooltip>
      </icon-button>

      ${isPeekable(blockElement)
        ? html`<icon-button
            size="32px"
            ?hidden=${!hasValidReference}
            @click=${() => {
              peek(blockElement);
            }}
          >
            ${CenterPeekIcon}
            <workbench-tooltip tip-position="top"
              >Open in center peek</workbench-tooltip
            >
          </icon-button>`
        : nothing}

      <icon-button
        size="32px"
        ?hidden=${!hasValidReference}
        @click=${() => {
          edgelessToBlob(blockElement.host, {
            surfaceRefBlock: blockElement,
            surfaceRenderer: blockElement.surfaceRenderer,
            edgelessElement:
              blockElement.referenceModel as BlockKit.EdgelessModelType,
            blockContainer: blockElement.portal,
          })
            .then(blob => {
              return writeImageBlobToClipboard(blob);
            })
            .then(() => {
              toast(blockElement.host, 'Copied image to clipboard');
            })
            .catch(err => {
              console.error(err);
            });
        }}
      >
        ${CopyIcon}

        <workbench-tooltip tip-position="top">Copy to clipboard</workbench-tooltip>
      </icon-button>

      <icon-button
        class="delete-button"
        size="32px"
        ?hidden=${readonly}
        @click="${() => {
          model.doc.deleteBlock(model);
          abortController.abort();
        }}"
      >
        ${DeleteIcon}

        <workbench-tooltip tip-position="top">Delete</workbench-tooltip>
      </icon-button>
    </div>
  `;
}
