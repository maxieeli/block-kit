import type { Constructor } from '@maxiee/block_global/utils';
import type { BlockModel } from '@maxiee/block_store';

import {
  type EdgelessSelectableProps,
  selectable,
} from '../edgeless/mixin/index.js';
import type { EmbedProps } from './types.js';

export function defineEmbedModel<
  Props extends object,
  T extends Constructor<BlockModel<Props>> = Constructor<BlockModel<Props>>,
>(SuperClass: T) {
  return selectable<Props & EdgelessSelectableProps>(
    SuperClass as Constructor<BlockModel<Props & EdgelessSelectableProps>>
  );
}

export type EmbedBlockModel<Props = object> = BlockModel<EmbedProps<Props>>;
