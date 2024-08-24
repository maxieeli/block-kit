import type { EmbedCardStyle } from './types.js';

export const BLOCK_ID_ATTR = 'data-block-id';

export const NOTE_WIDTH = 800;
export const BLOCK_CHILDREN_CONTAINER_PADDING_LEFT = 26;
export const EDGELESS_BLOCK_CHILD_PADDING = 24;
export const EDGELESS_BLOCK_CHILD_BORDER_WIDTH = 2;

// The height of the header, which is used to calculate the scroll offset
export const PAGE_HEADER_HEIGHT = 53;

export const EMBED_CARD_WIDTH: Record<EmbedCardStyle, number> = {
  horizontal: 752,
  horizontalThin: 752,
  list: 752,
  vertical: 364,
  cube: 170,
  cubeThick: 170,
  video: 752,
  figma: 752,
  html: 752,
  syncedDoc: 752,
};

export const EMBED_CARD_HEIGHT: Record<EmbedCardStyle, number> = {
  horizontal: 116,
  horizontalThin: 80,
  list: 46,
  vertical: 390,
  cube: 114,
  cubeThick: 132,
  video: 544,
  figma: 544,
  html: 544,
  syncedDoc: 455,
};

export const EMBED_BLOCK_FLAVOUR_LIST = [
  'workbench:embed-github',
  'workbench:embed-youtube',
  'workbench:embed-figma',
  'workbench:embed-linked-doc',
  'workbench:embed-synced-doc',
  'workbench:embed-html',
  'workbench:embed-loom',
] as const;

export const DEFAULT_IMAGE_PROXY_ENDPOINT = '';
export const DEFAULT_LINK_PREVIEW_ENDPOINT = '';

// This constant is used to ignore tags when exporting using html2canvas
export const CANVAS_EXPORT_IGNORE_TAGS = [
  'WORKBENCH-BLOCK-HUB',
  'EDGELESS-TOOLBAR',
  'WORKBENCH-DRAG-HANDLE-WIDGET',
  'WORKBENCH-FORMAT-BAR-WIDGET',
  'WORKBENCH-BLOCK-SELECTION',
];
