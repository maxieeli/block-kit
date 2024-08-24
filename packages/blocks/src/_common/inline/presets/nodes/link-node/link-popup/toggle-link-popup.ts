import './link-popup.js';

import type { InlineRange } from '@maxiee/block_inline';

import type { WorkbenchInlineEditor } from '../../../workbench-inline-specs.js';
import { LinkPopup } from './link-popup.js';

export function toggleLinkPopup(
  inlineEditor: WorkbenchInlineEditor,
  type: LinkPopup['type'],
  targetInlineRange: InlineRange,
  abortController: AbortController
): LinkPopup {
  const popup = new LinkPopup();
  popup.inlineEditor = inlineEditor;
  popup.type = type;
  popup.targetInlineRange = targetInlineRange;
  popup.abortController = abortController;

  document.body.append(popup);

  return popup;
}
