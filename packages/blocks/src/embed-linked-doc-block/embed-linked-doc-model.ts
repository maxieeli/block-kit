import { BlockModel } from '@maxiee/block_store';

import { defineEmbedModel } from '../_common/embed-block-helper/embed-block-model.js';
import type { EmbedCardStyle } from '../_common/types.js';

export const EmbedLinkedDocStyles: EmbedCardStyle[] = [
  'vertical',
  'horizontal',
  'list',
  'cube',
  'horizontalThin',
];

export type EmbedLinkedDocBlockProps = {
  pageId: string;
  style: EmbedCardStyle;
  caption: string | null;
};

export class EmbedLinkedDocModel extends defineEmbedModel<EmbedLinkedDocBlockProps>(
  BlockModel
) {}

declare global {
  namespace BlockKit {
    interface EdgelessBlockModelMap {
      'workbench:embed-linked-doc': EmbedLinkedDocModel;
    }
  }
}
