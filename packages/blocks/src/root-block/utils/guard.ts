import type { BlockElement } from '@maxiee/block-std';

import type { RootBlockComponent } from '../types.js';

export function isRootElement(
  blockElement: BlockElement
): blockElement is RootBlockComponent {
  return (
    blockElement.tagName === 'WORKBENCH-PAGE-ROOT' ||
    blockElement.tagName === 'WORKBENCH-EDGELESS-ROOT'
  );
}
