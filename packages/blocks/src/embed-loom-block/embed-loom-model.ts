import { BlockModel } from '@maxiee/block_store';

import { defineEmbedModel } from '../_common/embed-block-helper/embed-block-model.js';
import type { EmbedCardStyle } from '../_common/types.js';

export const loomUrlRegex: RegExp =
  /(?:https?:\/\/)??(?:www\.)?loom\.com\/share\/([a-zA-Z0-9]+)/;

export type EmbedLoomBlockUrlData = {
  videoId: string | null;
  image: string | null;
  title: string | null;
  description: string | null;
};

export const EmbedLoomStyles: EmbedCardStyle[] = ['video'] as const;

export type EmbedLoomBlockProps = {
  style: (typeof EmbedLoomStyles)[number];
  url: string;
  caption: string | null;
} & EmbedLoomBlockUrlData;

export class EmbedLoomModel extends defineEmbedModel<EmbedLoomBlockProps>(
  BlockModel
) {}

declare global {
  namespace BlockKit {
    interface EdgelessBlockModelMap {
      'workbench:embed-loom': EmbedLoomModel;
    }
  }
}
