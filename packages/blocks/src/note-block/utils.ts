import type { BlockElement } from '@maxiee/block-std';

export const ensureBlockInContainer = (
  blockElement: BlockElement,
  containerElement: BlockElement
) =>
  containerElement.contains(blockElement) && blockElement !== containerElement;
