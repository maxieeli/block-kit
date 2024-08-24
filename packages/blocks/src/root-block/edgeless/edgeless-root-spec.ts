import type {
  BlockElement,
  BlockService,
  BlockSpec,
  BlockSpecSlots,
} from '@maxiee/block-std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { RootBlockSchema } from '../root-model.js';
import { WORKBENCH_DOC_REMOTE_SELECTION_WIDGET } from '../widgets/doc-remote-selection/doc-remote-selection.js';
import { WORKBENCH_DRAG_HANDLE_WIDGET } from '../widgets/drag-handle/drag-handle.js';
import { WORKBENCH_EDGELESS_AUTO_CONNECT_WIDGET } from '../widgets/edgeless-auto-connect/edgeless-auto-connect.js';
import { WORKBENCH_EDGELESS_REMOTE_SELECTION_WIDGET } from '../widgets/edgeless-remote-selection/index.js';
import { WORKBENCH_EDGELESS_ZOOM_TOOLBAR_WIDGET } from '../widgets/edgeless-zoom-toolbar/index.js';
import { WORKBENCH_EMBED_CARD_TOOLBAR_WIDGET } from '../widgets/embed-card-toolbar/embed-card-toolbar.js';
import { WORKBENCH_FORMAT_BAR_WIDGET } from '../widgets/format-bar/format-bar.js';
import { EDGELESS_ELEMENT_TOOLBAR_WIDGET } from '../widgets/index.js';
import { WORKBENCH_INNER_MODAL_WIDGET } from '../widgets/inner-modal/inner-modal.js';
import { WORKBENCH_LINKED_DOC_WIDGET } from '../widgets/linked-doc/index.js';
import { WORKBENCH_MODAL_WIDGET } from '../widgets/modal/modal.js';
import { WORKBENCH_PIE_MENU_WIDGET } from '../widgets/pie-menu/index.js';
import { WORKBENCH_SLASH_MENU_WIDGET } from '../widgets/slash-menu/index.js';
import { WORKBENCH_VIEWPORT_OVERLAY_WIDGET } from '../widgets/viewport-overlay/viewport-overlay.js';
import type { EdgelessRootBlockComponent } from './edgeless-root-block.js';
import { EdgelessRootService } from './edgeless-root-service.js';

export type EdgelessRootBlockWidgetName =
  // | typeof WORKBENCH_BLOCK_HUB_WIDGET
  | typeof WORKBENCH_MODAL_WIDGET
  | typeof WORKBENCH_INNER_MODAL_WIDGET
  | typeof WORKBENCH_PIE_MENU_WIDGET
  | typeof WORKBENCH_SLASH_MENU_WIDGET
  | typeof WORKBENCH_LINKED_DOC_WIDGET
  | typeof WORKBENCH_DRAG_HANDLE_WIDGET
  | typeof WORKBENCH_EMBED_CARD_TOOLBAR_WIDGET
  | typeof WORKBENCH_FORMAT_BAR_WIDGET
  | typeof WORKBENCH_DOC_REMOTE_SELECTION_WIDGET
  | typeof WORKBENCH_EDGELESS_REMOTE_SELECTION_WIDGET
  | typeof WORKBENCH_EDGELESS_ZOOM_TOOLBAR_WIDGET
  | typeof EDGELESS_ELEMENT_TOOLBAR_WIDGET
  | typeof WORKBENCH_VIEWPORT_OVERLAY_WIDGET
  | typeof WORKBENCH_EDGELESS_AUTO_CONNECT_WIDGET;

export const EdgelessRootBlockSpec: BlockSpec<EdgelessRootBlockWidgetName> = {
  schema: RootBlockSchema,
  service: EdgelessRootService,
  view: {
    component: literal`workbench-edgeless-root`,
    widgets: {
      // [WORKBENCH_BLOCK_HUB_WIDGET]: literal`${unsafeStatic(
      //   WORKBENCH_BLOCK_HUB_WIDGET
      // )}`,
      [WORKBENCH_MODAL_WIDGET]: literal`${unsafeStatic(WORKBENCH_MODAL_WIDGET)}`,
      [WORKBENCH_INNER_MODAL_WIDGET]: literal`${unsafeStatic(WORKBENCH_INNER_MODAL_WIDGET)}`,
      [WORKBENCH_PIE_MENU_WIDGET]: literal`${unsafeStatic(WORKBENCH_PIE_MENU_WIDGET)}`,
      [WORKBENCH_SLASH_MENU_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_SLASH_MENU_WIDGET
      )}`,
      [WORKBENCH_LINKED_DOC_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_LINKED_DOC_WIDGET
      )}`,
      [WORKBENCH_DRAG_HANDLE_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_DRAG_HANDLE_WIDGET
      )}`,
      [WORKBENCH_EMBED_CARD_TOOLBAR_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_EMBED_CARD_TOOLBAR_WIDGET
      )}`,
      [WORKBENCH_FORMAT_BAR_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_FORMAT_BAR_WIDGET
      )}`,
      [WORKBENCH_DOC_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_DOC_REMOTE_SELECTION_WIDGET
      )}`,
      [WORKBENCH_EDGELESS_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_EDGELESS_REMOTE_SELECTION_WIDGET
      )}`,
      [WORKBENCH_EDGELESS_ZOOM_TOOLBAR_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_EDGELESS_ZOOM_TOOLBAR_WIDGET
      )}`,
      [EDGELESS_ELEMENT_TOOLBAR_WIDGET]: literal`${unsafeStatic(EDGELESS_ELEMENT_TOOLBAR_WIDGET)}`,
      [WORKBENCH_VIEWPORT_OVERLAY_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_VIEWPORT_OVERLAY_WIDGET
      )}`,
      [WORKBENCH_EDGELESS_AUTO_CONNECT_WIDGET]: literal`${unsafeStatic(
        WORKBENCH_EDGELESS_AUTO_CONNECT_WIDGET
      )}`,
    },
  },
};

export const PreviewEdgelessRootBlockSpec: BlockSpec = {
  schema: RootBlockSchema,
  service: EdgelessRootService,
  view: {
    component: literal`workbench-edgeless-root`,
  },
  setup(slots: BlockSpecSlots) {
    slots.viewConnected.on(
      ({
        component,
        service,
      }: {
        component: BlockElement;
        service: BlockService;
      }) => {
        // Does not allow the edgeless to display toolbar.
        (component as EdgelessRootBlockComponent).disableComponents = true;
        // Does not allow the user to move and zoom.
        (service as EdgelessRootService).locked = true;
      }
    );
  },
};
