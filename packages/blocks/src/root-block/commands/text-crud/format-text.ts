import type { Command, TextSelection } from '@maxiee/block-std';
import type { EditorHost } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import { INLINE_ROOT_ATTR, type InlineRootElement } from '@maxiee/block_inline';

import { FORMAT_TEXT_SUPPORT_FLAVOURS } from '../../../_common/configs/text-format/consts.js';
import type { WorkbenchTextAttributes } from '../../../_common/inline/presets/workbench-inline-specs.js';
import { clearMarksOnDiscontinuousInput } from '../../../_common/utils/inline-editor.js';

// for text selection
export const formatTextCommand: Command<
  'currentTextSelection',
  never,
  {
    textSelection?: TextSelection;
    styles: WorkbenchTextAttributes;
    mode?: 'replace' | 'merge';
  }
> = (ctx, next) => {
  const { styles, mode = 'merge' } = ctx;

  const textSelection = ctx.textSelection ?? ctx.currentTextSelection;
  assertExists(
    textSelection,
    '`textSelection` is required, you need to pass it in args or use `getTextSelection` command before adding this command to the pipeline.'
  );

  const success = ctx.std.command
    .chain()
    .getSelectedBlocks({
      textSelection,
      filter: el =>
        FORMAT_TEXT_SUPPORT_FLAVOURS.includes(
          el.model.flavour as BlockKit.Flavour
        ),
      types: ['text'],
    })
    .inline((ctx, next) => {
      const { selectedBlocks } = ctx;
      assertExists(selectedBlocks);

      const selectedInlineEditors = selectedBlocks.flatMap(el => {
        const inlineRoot = el.querySelector<
          InlineRootElement<WorkbenchTextAttributes>
        >(`[${INLINE_ROOT_ATTR}]`);
        if (inlineRoot && inlineRoot.inlineEditor.getInlineRange()) {
          return inlineRoot.inlineEditor;
        }
        return [];
      });

      selectedInlineEditors.forEach(inlineEditor => {
        const inlineRange = inlineEditor.getInlineRange();
        if (!inlineRange) return;

        if (inlineRange.length === 0) {
          const delta = inlineEditor.getDeltaByRangeIndex(inlineRange.index);
          if (!delta) return;

          inlineEditor.setMarks({
            ...inlineEditor.marks,
            ...Object.fromEntries(
              Object.entries(styles).map(([key, value]) => {
                if (typeof value === 'boolean') {
                  return [
                    key,
                    (inlineEditor.marks &&
                      inlineEditor.marks[key as keyof WorkbenchTextAttributes]) ||
                    (delta.attributes &&
                      delta.attributes[key as keyof WorkbenchTextAttributes])
                      ? null
                      : value,
                  ];
                }
                return [key, value];
              })
            ),
          });
          clearMarksOnDiscontinuousInput(inlineEditor);
        } else {
          inlineEditor.formatText(inlineRange, styles, {
            mode,
          });
        }
      });

      Promise.all(selectedBlocks.map(el => el.updateComplete))
        .then(() => {
          (ctx.std.host as EditorHost).rangeManager?.syncTextSelectionToRange(
            textSelection
          );
        })
        .catch(console.error);

      next();
    })
    .run();

  if (success) next();
};

declare global {
  namespace BlockKit {
    interface Commands {
      formatText: typeof formatTextCommand;
    }
  }
}
