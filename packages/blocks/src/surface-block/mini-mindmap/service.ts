import { BlockService } from '@maxiee/block-std';
import { Slot } from '@maxiee/block_store';

import type { RootBlockModel } from '../../root-block/root-model.js';

export class MindmapService extends BlockService<RootBlockModel> {
  requestCenter = new Slot();

  override mounted(): void {}

  center() {
    this.requestCenter.emit();
  }
}
