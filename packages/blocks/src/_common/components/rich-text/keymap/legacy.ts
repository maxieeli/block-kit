import type { EditorHost } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import {
  type InlineRange,
  KEYBOARD_ALLOW_DEFAULT,
  KEYBOARD_PREVENT_DEFAULT,
} from '@maxiee/block_inline';
import type { BlockModel } from '@maxiee/block_store';

import { matchFlavours } from '../../../../_common/utils/model.js';
import type { WorkbenchInlineEditor } from '../../../inline/presets/workbench-inline-specs.js';
import {
  handleBlockEndEnter,
  handleBlockSplit,
  handleLineEndForwardDelete,
  handleLineStartBackspace,
  handleUnindent,
} from '../rich-text-operations.js';

function isCollapsedAtBlockStart(inlineEditor: WorkbenchInlineEditor) {
  const inlineRange = inlineEditor.getInlineRange();
  return inlineRange?.index === 0 && inlineRange?.length === 0;
}

function isCollapsedAtBlockEnd(inlineEditor: WorkbenchInlineEditor) {
  const inlineRange = inlineEditor.getInlineRange();
  return (
    inlineRange?.index === inlineEditor.yText.length &&
    inlineRange?.length === 0
  );
}

export function onSoftEnter(
  inlineRange: InlineRange,
  inlineEditor: WorkbenchInlineEditor
) {
  inlineEditor.insertText(inlineRange, '\n');
  inlineEditor.setInlineRange({
    index: inlineRange.index + 1,
    length: 0,
  });
  return KEYBOARD_PREVENT_DEFAULT;
}

export function hardEnter(
  editorHost: EditorHost,
  model: BlockModel,
  range: InlineRange,
  /**
   * @deprecated
   */
  inlineEditor: WorkbenchInlineEditor,
  e: KeyboardEvent,
  shortKey = false
) {
  const doc = model.doc;
  e.stopPropagation();
  const parent = doc.getParent(model);
  const isLastChild = parent?.lastChild() === model;
  const isEmptyList =
    matchFlavours(model, ['workbench:list']) && model.text.length === 0;

  assertExists(model.text, 'Failed to hardEnter! model.text not exists!');
  if (
    isEmptyList &&
    parent &&
    matchFlavours(parent, ['workbench:note', 'workbench:database']) &&
    model.children.length === 0
  ) {
    // TODO use `handleLineStartBackspace` directly is not concise enough,
    // we should extract a function to handle this case
    //
    // Before
    // - list
    // - | <-- press Enter
    //
    // After
    // - list
    // |   <-- will replace with a new text block
    handleLineStartBackspace(editorHost, model);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  if (isEmptyList && isLastChild) {
    // Before
    // - line1
    //   - ↩ <-- press Enter
    //
    // After
    // - line1
    // - | <-- will unindent the block
    handleUnindent(editorHost, model, range.index);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  const isEnd = model.text.length === range.index;
  const softEnterable = isSoftEnterable(model);
  if (isEnd && softEnterable) {
    if (matchFlavours(model, ['workbench:code'])) {
      if (shortKey) {
        // shortKey+Enter to exit the block
        handleBlockEndEnter(editorHost, model);
        return KEYBOARD_PREVENT_DEFAULT;
      }

      // add a new line to the block when press Enter solely
      onSoftEnter(range, inlineEditor);
      return KEYBOARD_PREVENT_DEFAULT;
    }

    const textStr = model.text.toString();
    const endWithTwoBlankLines = textStr === '\n' || textStr.endsWith('\n');
    const shouldSoftEnter = softEnterable && !endWithTwoBlankLines;

    if (shouldSoftEnter || shortKey) {
      onSoftEnter(range, inlineEditor);
      return KEYBOARD_PREVENT_DEFAULT;
    }

    // delete the \n at the end of block
    // Before
    // >
    // > ↩ <-- press Enter
    //
    // After
    // - line1
    // - | <-- will unindent the block
    model.text.delete(range.index - 1, 1);
    handleBlockEndEnter(editorHost, model);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  if (isEnd || shortKey) {
    handleBlockEndEnter(editorHost, model);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  const isSoftEnterBlock = isSoftEnterable(model);
  if (isSoftEnterBlock) {
    onSoftEnter(range, inlineEditor);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  handleBlockSplit(editorHost, model, range.index, range.length)?.catch(
    console.error
  );
  return KEYBOARD_PREVENT_DEFAULT;
}

// If a block is soft enterable, the rule is:
// 1. In the end of block, first press Enter will insert a \n to break the line, second press Enter will insert a new block
// 2. In the middle and start of block, press Enter will insert a \n to break the line
// TODO this should be configurable per-block
function isSoftEnterable(model: BlockModel) {
  if (matchFlavours(model, ['workbench:code'])) return true;
  if (matchFlavours(model, ['workbench:paragraph'])) {
    return model.type === 'quote';
  }
  return false;
}

export function onBackspace(
  editorHost: EditorHost,
  model: BlockModel,
  e: KeyboardEvent,
  inlineEditor: WorkbenchInlineEditor
) {
  if (isCollapsedAtBlockStart(inlineEditor)) {
    if (model.flavour === 'workbench:code') {
      return KEYBOARD_ALLOW_DEFAULT;
    }
    e.stopPropagation();
    handleLineStartBackspace(editorHost, model);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  e.stopPropagation();
  return KEYBOARD_ALLOW_DEFAULT;
}

export function onForwardDelete(
  editorHost: EditorHost,
  model: BlockModel,
  e: KeyboardEvent,
  inlineEditor: WorkbenchInlineEditor
) {
  e.stopPropagation();
  if (isCollapsedAtBlockEnd(inlineEditor)) {
    handleLineEndForwardDelete(editorHost, model);
    return KEYBOARD_PREVENT_DEFAULT;
  }
  return KEYBOARD_ALLOW_DEFAULT;
}
