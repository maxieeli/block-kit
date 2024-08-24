import { defineBlockSchema, type SchemaToModel } from '@maxiee/block_store';
import type { BundledLanguage, Highlighter, PlainTextLanguage } from 'shiki';

import { FALLBACK_LANG } from './utils/consts.js';

export const CodeBlockSchema = defineBlockSchema({
  flavour: 'workbench:code',
  props: internal => ({
    text: internal.Text(),
    language: FALLBACK_LANG,
    wrap: false,
    caption: '',
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: [
      'workbench:note',
      'workbench:paragraph',
      'workbench:list',
      'workbench:edgeless-text',
    ],
    children: [],
  },
});

export type CodeBlockModel = SchemaToModel<typeof CodeBlockSchema>;
export type HighlightOptionsGetter = () => {
  lang: BundledLanguage | PlainTextLanguage;
  highlighter: Highlighter | null;
};
