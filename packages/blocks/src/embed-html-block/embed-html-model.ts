import { BlockModel } from '@maxiee/block_store';

import { defineEmbedModel } from '../_common/embed-block-helper/embed-block-model.js';
import type { EmbedCardStyle } from '../_common/types.js';

export const EmbedHtmlStyles: EmbedCardStyle[] = ['html'] as const;

export type EmbedHtmlBlockProps = {
  style: (typeof EmbedHtmlStyles)[number];
  caption: string | null;
  html?: string;
  design?: string;
};

export class EmbedHtmlModel extends defineEmbedModel<EmbedHtmlBlockProps>(
  BlockModel
) {}

declare global {
  namespace BlockKit {
    interface EdgelessBlockModelMap {
      'workbench:embed-html': EmbedHtmlModel;
    }
  }
}
