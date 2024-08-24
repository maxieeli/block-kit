// import type { WORKBENCH_BLOCK_HUB_WIDGET } from '../root-block/widgets/block-hub/block-hub.js';

import type { EdgelessRootBlockComponent } from './edgeless/edgeless-root-block.js';
import type { PageRootBlockComponent } from './page/page-root-block.js';
import type { WORKBENCH_DOC_REMOTE_SELECTION_WIDGET } from './widgets/doc-remote-selection/doc-remote-selection.js';
import type { WORKBENCH_DRAG_HANDLE_WIDGET } from './widgets/drag-handle/drag-handle.js';
import type { WORKBENCH_EDGELESS_REMOTE_SELECTION_WIDGET } from './widgets/edgeless-remote-selection/index.js';
import type { WORKBENCH_EDGELESS_ZOOM_TOOLBAR_WIDGET } from './widgets/edgeless-zoom-toolbar/index.js';
import type { EDGELESS_ELEMENT_TOOLBAR_WIDGET } from './widgets/element-toolbar/index.js';
import type { WORKBENCH_EMBED_CARD_TOOLBAR_WIDGET } from './widgets/embed-card-toolbar/embed-card-toolbar.js';
import type { WORKBENCH_FORMAT_BAR_WIDGET } from './widgets/format-bar/format-bar.js';
import type { WORKBENCH_INNER_MODAL_WIDGET } from './widgets/inner-modal/inner-modal.js';
import type { WORKBENCH_LINKED_DOC_WIDGET } from './widgets/linked-doc/index.js';
import type { WORKBENCH_MODAL_WIDGET } from './widgets/modal/modal.js';
import type { WORKBENCH_PAGE_DRAGGING_AREA_WIDGET } from './widgets/page-dragging-area/page-dragging-area.js';
import type { WORKBENCH_PIE_MENU_ID_EDGELESS_TOOLS } from './widgets/pie-menu/config.js';
import type { WORKBENCH_PIE_MENU_WIDGET } from './widgets/pie-menu/index.js';
import type { WORKBENCH_SLASH_MENU_WIDGET } from './widgets/slash-menu/index.js';
import type { WORKBENCH_VIEWPORT_OVERLAY_WIDGET } from './widgets/viewport-overlay/viewport-overlay.js';

export type PageRootBlockWidgetName =
  // | typeof WORKBENCH_BLOCK_HUB_WIDGET
  | typeof WORKBENCH_MODAL_WIDGET
  | typeof WORKBENCH_INNER_MODAL_WIDGET
  | typeof WORKBENCH_SLASH_MENU_WIDGET
  | typeof WORKBENCH_LINKED_DOC_WIDGET
  | typeof WORKBENCH_PAGE_DRAGGING_AREA_WIDGET
  | typeof WORKBENCH_DRAG_HANDLE_WIDGET
  | typeof WORKBENCH_EMBED_CARD_TOOLBAR_WIDGET
  | typeof WORKBENCH_FORMAT_BAR_WIDGET
  | typeof WORKBENCH_DOC_REMOTE_SELECTION_WIDGET
  | typeof WORKBENCH_VIEWPORT_OVERLAY_WIDGET;

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
  | typeof WORKBENCH_VIEWPORT_OVERLAY_WIDGET;

export type RootBlockComponent =
  | PageRootBlockComponent
  | EdgelessRootBlockComponent;

export type PieMenuId = typeof WORKBENCH_PIE_MENU_ID_EDGELESS_TOOLS;
