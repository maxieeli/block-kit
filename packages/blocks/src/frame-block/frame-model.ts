import type { Text } from '@maxiee/block_store';
import { BlockModel, defineBlockSchema } from '@maxiee/block_store';

import { selectable } from '../_common/edgeless/mixin/edgeless-selectable.js';
import type { IHitTestOptions } from '../surface-block/element-model/base.js';
import { Bound } from '../surface-block/utils/bound.js';
import type { SerializedXYWH } from '../surface-block/utils/xywh.js';

type FrameBlockProps = {
  title: Text;
  background: string;
  xywh: SerializedXYWH;
  index: string;
};

export const FrameBlockSchema = defineBlockSchema({
  flavour: 'workbench:frame',
  props: (internal): FrameBlockProps => ({
    title: internal.Text(),
    background: '--workbench-palette-transparent',
    xywh: `[0,0,100,100]`,
    index: 'a0',
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: ['workbench:surface'],
    children: [],
  },
  toModel: () => {
    return new FrameBlockModel();
  },
});

export class FrameBlockModel extends selectable<FrameBlockProps>(BlockModel) {
  static PADDING = [8, 10];

  override hitTest(x: number, y: number, _: IHitTestOptions): boolean {
    const bound = Bound.deserialize(this.xywh);
    const hit = bound.isPointNearBound([x, y], 5);

    if (hit) return true;

    return this.externalBound?.isPointInBound([x, y]) ?? false;
  }

  override boxSelect(selectedBound: Bound): boolean {
    const bound = Bound.deserialize(this.xywh);
    return (
      bound.isIntersectWithBound(selectedBound) || selectedBound.contains(bound)
    );
  }
}

declare global {
  namespace BlockKit {
    interface EdgelessBlockModelMap {
      'workbench:frame': FrameBlockModel;
    }
  }
}
