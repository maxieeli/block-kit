import type { DisposableGroup } from '@maxiee/block_global/utils';
import type { BlockSchemaType } from '@maxiee/block_store';

import type { BlockService } from '../service/index.js';
import type { BlockServiceConstructor } from '../service/index.js';
import type { BlockSpecSlots } from './slots.js';

export interface BlockView<WidgetNames extends string = string> {
  component: BlockKit.Component;
  widgets?: Record<WidgetNames, BlockKit.Component>;
}

export interface BlockSpec<
  WidgetNames extends string = string,
  Service extends BlockService = BlockService,
> {
  schema: BlockSchemaType;
  service?: BlockServiceConstructor<Service>;
  view: BlockView<WidgetNames>;
  setup?: (slots: BlockSpecSlots, disposableGroup: DisposableGroup) => void;
}
