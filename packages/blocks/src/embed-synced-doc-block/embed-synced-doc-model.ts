import { BlockModel } from '@maxiee/block_store';

import { defineEmbedModel } from '../_common/embed-block-helper/embed-block-model.js';
import type { EmbedCardStyle } from '../_common/types.js';

export const EmbedSyncedDocStyles: EmbedCardStyle[] = ['syncedDoc'];

export type EmbedSyncedDocBlockProps = {
  pageId: string;
  style: EmbedCardStyle;
  caption?: string | null;
  scale?: number;
};

export class EmbedSyncedDocModel extends defineEmbedModel<EmbedSyncedDocBlockProps>(
  BlockModel
) {}

declare global {
  namespace BlockKit {
    interface EdgelessBlockModelMap {
      'workbench:embed-synced-doc': EmbedSyncedDocModel;
    }
  }
}
