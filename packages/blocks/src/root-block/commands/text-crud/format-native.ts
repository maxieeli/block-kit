import type { Command } from '@maxiee/block-std';
import type { BlockElement } from '@maxiee/block-std';
import { INLINE_ROOT_ATTR, type InlineRootElement } from '@maxiee/block_inline';

import { FORMAT_NATIVE_SUPPORT_FLAVOURS } from '../../../_common/configs/text-format/consts.js';
import { BLOCK_ID_ATTR } from '../../../_common/consts.js';
import type { WorkbenchTextAttributes } from '../../../_common/inline/presets/workbench-inline-specs.js';

// for native range
export const formatNativeCommand: Command<
  never,
  never,
  {
    range?: Range;
    styles: WorkbenchTextAttributes;
    mode?: 'replace' | 'merge';
  }
> = (ctx, next) => {
  const { styles, mode = 'merge' } = ctx;

  let range = ctx.range;
  if (!range) {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    range = selection.getRangeAt(0);
  }
  if (!range) return;

  const selectedInlineEditors = Array.from<InlineRootElement>(
    ctx.std.host.querySelectorAll(`[${INLINE_ROOT_ATTR}]`)
  )
    .filter(el => range?.intersectsNode(el))
    .filter(el => {
      const blockElement = el.closest<BlockElement>(`[${BLOCK_ID_ATTR}]`);
      if (blockElement) {
        return FORMAT_NATIVE_SUPPORT_FLAVOURS.includes(
          blockElement.model.flavour as BlockKit.Flavour
        );
      }
      return false;
    })
    .map(el => el.inlineEditor);

  selectedInlineEditors.forEach(inlineEditor => {
    const inlineRange = inlineEditor.getInlineRange();
    if (!inlineRange) return;

    inlineEditor.formatText(inlineRange, styles, {
      mode,
    });
  });

  next();
};

declare global {
  namespace BlockKit {
    interface Commands {
      formatNative: typeof formatNativeCommand;
    }
  }
}
