import { BlockModel, defineBlockSchema } from '@maxiee/block_store';

import { selectable } from '../_common/edgeless/mixin/edgeless-selectable.js';
import {
  FontFamily,
  FontStyle,
  FontWeight,
  TextAlign,
  type TextStyleProps,
} from '../surface-block/consts.js';
import type { SerializedXYWH } from '../surface-block/utils/xywh.js';

type EdgelessTextProps = {
  xywh: SerializedXYWH;
  index: string;
  scale: number;
  rotate: number;
  hasMaxWidth: boolean;
} & Omit<TextStyleProps, 'fontSize'>;

export const EdgelessTextBlockSchema = defineBlockSchema({
  flavour: 'workbench:edgeless-text',
  props: (): EdgelessTextProps => ({
    xywh: '[0,0,16,16]',
    index: 'a0',
    color: '#000000',
    fontFamily: FontFamily.Inter,
    fontStyle: FontStyle.Normal,
    fontWeight: FontWeight.Regular,
    textAlign: TextAlign.Left,
    scale: 1,
    rotate: 0,
    hasMaxWidth: false,
  }),
  metadata: {
    version: 1,
    role: 'hub',
    parent: ['workbench:surface'],
    children: [
      'workbench:paragraph',
      'workbench:list',
      'workbench:code',
      'workbench:image',
      'workbench:bookmark',
      'workbench:attachment',
      'workbench:embed-*',
    ],
  },
  toModel: () => {
    return new EdgelessTextBlockModel();
  },
});

export class EdgelessTextBlockModel extends selectable<EdgelessTextProps>(
  BlockModel
) {}
