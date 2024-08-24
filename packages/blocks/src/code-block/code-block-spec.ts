import type { BlockSpec } from '@maxiee/block-std';
import { literal } from 'lit/static-html.js';

import { CodeBlockSchema } from './code-model.js';

export const CodeBlockSpec: BlockSpec = {
  schema: CodeBlockSchema,
  view: {
    component: literal`workbench-code`,
    widgets: {
      codeToolbar: literal`workbench-code-toolbar-widget`,
      codeLangList: literal`workbench-code-language-list-widget`,
    },
  },
};
