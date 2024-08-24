import type { AttributeRenderer } from '@maxiee/block_inline';
import { html } from 'lit';

import type { HighlightOptionsGetter } from '../code-model.js';

export const getCodeLineRenderer: (
  highlightOptionsGetter: HighlightOptionsGetter
) => AttributeRenderer = highlightOptionsGetter => delta => {
  return html`<workbench-code-line
    .delta=${delta}
    .highlightOptionsGetter=${highlightOptionsGetter}
  ></workbench-code-line>`;
};
