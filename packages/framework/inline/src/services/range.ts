import { REQUEST_IDLE_CALLBACK_ENABLED } from '@maxiee/block_global/env';
import { assertExists } from '@maxiee/block_global/utils';
import * as Y from 'yjs';
import type { VLine } from '../components/v-line.js';
import type { InlineEditor } from '../inline-editor.js';
import type {
  InlineRange,
  InlineRangeUpdatedProp,
  TextPoint,
} from '../types.js';
import type { BaseTextAttributes } from '../utils/base-attributes.js';
import { isMaybeInlineRangeEqual } from '../utils/inline-range.js';
import {
  domRangeToInlineRange,
  inlineRangeToDomRange,
} from '../utils/range-conversion.js';
import { calculateTextLength, getTextNodesFromElement } from '../utils/text.js';

export class RangeService<TextAttributes extends BaseTextAttributes> {
  get yText() {
    return this.editor.yText;
  }
  get inlineRangeProvider() {
    return this.editor.inlineRangeProvider;
  }
  get rootElement() {
    return this.editor.rootElement;
  }
  get lastStartRelativePosition() {
    return this._lastStartRelativePosition;
  }
  get lastEndRelativePosition() {
    return this._lastEndRelativePosition;
  }

  private _inlineRange: InlineRange | null = null;
  private _lastStartRelativePosition: Y.RelativePosition | null = null;
  private _lastEndRelativePosition: Y.RelativePosition | null = null;

  constructor(readonly editor: InlineEditor<TextAttributes>) {}

  private _applyInlineRange = (inlineRange: InlineRange): void => {
    const selection = document.getSelection();
    if (!selection) {
      return;
    }
    const newRange = this.toDomRange(inlineRange);

    if (!newRange) {
      return;
    }

    selection.removeAllRanges();
    selection.addRange(newRange);
    this.editor.slots.inlineRangeApply.emit(newRange);
  };

  onInlineRangeUpdated = async ([
    newInlineRange,
    sync,
  ]: InlineRangeUpdatedProp) => {
    const eq = isMaybeInlineRangeEqual(this._inlineRange, newInlineRange);
    if (eq) {
      return;
    }
    this._inlineRange = newInlineRange;

    if (newInlineRange) {
      this._lastStartRelativePosition = Y.createRelativePositionFromTypeIndex(
        this.yText,
        newInlineRange.index
      );
      this._lastEndRelativePosition = Y.createRelativePositionFromTypeIndex(
        this.yText,
        newInlineRange.index + newInlineRange.length
      );
    } else {
      this._lastStartRelativePosition = null;
      this._lastEndRelativePosition = null;
    }

    // try to trigger update because the `selected` state of inline editor element may change
    if (this.editor.mounted) {
      // range change may happen before the editor is prepared
      await this.editor.waitForUpdate();
      // improve performance
      if (REQUEST_IDLE_CALLBACK_ENABLED) {
        requestIdleCallback(() => {
          this.editor.requestUpdate(false);
        });
      } else {
        Promise.resolve()
          .then(() => {
            this.editor.requestUpdate(false);
          })
          .catch(console.error);
      }
    }
    if (!sync) {
      return;
    }

    if (this._inlineRange === null) {
      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range.intersectsNode(this.editor.rootElement)) {
          selection.removeAllRanges();
        }
      }
      return;
    }

    const fn = () => {
      this.syncInlineRange();
    };

    // updates in lit are performed asynchronously
    requestAnimationFrame(fn);
  }

  getNativeSelection(): Selection | null {
    const selection = document.getSelection();
    if (!selection) return null;
    if (selection.rangeCount === 0) return null;

    return selection;
  }

  getNativeRange(): Range | null {
    const selection = this.getNativeSelection();
    if (!selection) return null;
    return selection.getRangeAt(0);
  }

  getInlineRange = (): InlineRange | null => {
    if (this.inlineRangeProvider) {
      return this.inlineRangeProvider.getInlineRange();
    }
    return this._inlineRange;
  };

  getInlineRangeFromElement = (element: Element): InlineRange | null => {
    const range = document.createRange();
    const text = element.querySelector('[data-v-text');
    if (!text) {
      return null;
    }
    const textNode = text.childNodes[1];
    assertExists(textNode instanceof Text);
    range.setStart(textNode, 0);
    range.setEnd(textNode, textNode.textContent?.length ?? 0);
    const inlineRange = this.toInlineRange(range);
    return inlineRange;
  };

  getTextPoint(rangeIndex: InlineRange['index']): TextPoint {
    const vLines = Array.from(this.rootElement.querySelectorAll('v-line'));

    let index = 0;
    for (const vLine of vLines) {
      const texts = getTextNodesFromElement(vLine);
      if (texts.length === 0) {
        throw new Error('text node in v-text not found');
      }

      for (const text of texts) {
        if (!text.textContent) {
          throw new Error('text element should have textContent');
        }
        if (index + text.textContent.length >= rangeIndex) {
          return [text, rangeIndex - index];
        }
        index += calculateTextLength(text);
      }

      index += 1;
    }

    throw new Error('failed to find leaf');
  }

  getLine(rangeIndex: InlineRange['index']): {
    line: VLine;
    lineIndex: number;
    rangeIndexRelatedToLine: number;
  } {
    const lineElements = Array.from(
      this.rootElement.querySelectorAll('v-line')
    );

    let beforeIndex = 0;
    for (const [lineIndex, lineElement] of lineElements.entries()) {
      if (
        rangeIndex >= beforeIndex &&
        rangeIndex < beforeIndex + lineElement.vTextLength + 1
      ) {
        return {
          line: lineElement,
          lineIndex,
          rangeIndexRelatedToLine: rangeIndex - beforeIndex,
        };
      }
      beforeIndex += lineElement.vTextLength + 1;
    }

    throw new Error('failed to find line');
  }

  isValidInlineRange = (inlineRange: InlineRange | null): boolean => {
    return !(
      inlineRange &&
      (inlineRange.index < 0 ||
        inlineRange.index + inlineRange.length > this.editor.yText.length)
    );
  };

  isFirstLine = (inlineRange: InlineRange | null): boolean => {
    if (!inlineRange) return false;

    if (inlineRange.length > 0) {
      throw new Error('Inline range should be collapsed');
    }

    const range = this.toDomRange(inlineRange);
    if (!range) {
      throw new Error('failed to convert inline range to domRange');
    }

    // check case 1:
    const beforeText = this.editor.yTextString.slice(0, inlineRange.index);
    if (beforeText.includes('\n')) {
      return false;
    }

    const container = range.commonAncestorContainer.parentElement;
    assertExists(container);
    const containerRect = container.getBoundingClientRect();
    const rangeRects = range.getClientRects();
    const rangeRect = rangeRects[rangeRects.length - 1];
    return rangeRect.top === containerRect.top;
  };

  isLastLine = (inlineRange: InlineRange | null): boolean => {
    if (!inlineRange) return false;

    if (inlineRange.length > 0) {
      throw new Error('Inline range should be collapsed');
    }

    // check case 1:
    const afterText = this.editor.yTextString.slice(inlineRange.index);
    if (afterText.includes('\n')) {
      return false;
    }

    const range = this.toDomRange(inlineRange);
    if (!range) {
      throw new Error('failed to convert inline range to domRange');
    }
    const container = range.commonAncestorContainer.parentElement;
    assertExists(container);
    const containerRect = container.getBoundingClientRect();
    const rangeRects = range.getClientRects();
    const rangeRect = rangeRects[rangeRects.length - 1];
    return rangeRect.bottom === containerRect.bottom;
  };

  setInlineRange = (inlineRange: InlineRange | null, sync = true): void => {
    if (!this.isValidInlineRange(inlineRange)) {
      throw new Error('invalid inline range');
    }
    if (this.inlineRangeProvider) {
      this.inlineRangeProvider.setInlineRange(inlineRange, sync);
      return;
    }
    this.editor.slots.inlineRangeUpdate.emit([inlineRange, sync]);
  };

  focusEnd = (): void => {
    this.setInlineRange({
      index: this.editor.yTextLength,
      length: 0,
    });
  };

  focusStart = (): void => {
    this.setInlineRange({
      index: 0,
      length: 0,
    });
  };

  selectAll = (): void => {
    this.setInlineRange({
      index: 0,
      length: this.editor.yTextLength,
    });
  };

  focusIndex = (index: number): void => {
    this.setInlineRange({
      index,
      length: 0,
    });
  };

  syncInlineRange = (): void => {
    const inlineRange = this.getInlineRange();
    if (inlineRange && this.editor.mounted) {
      this._applyInlineRange(inlineRange);
    }
  };

  toDomRange = (inlineRange: InlineRange): Range | null => {
    const rootElement = this.editor.rootElement;
    return inlineRangeToDomRange(rootElement, inlineRange);
  };

  toInlineRange = (range: Range): InlineRange | null => {
    const { rootElement, yText } = this.editor;
    return domRangeToInlineRange(range, rootElement, yText);
  };
}
