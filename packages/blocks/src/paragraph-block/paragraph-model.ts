import { defineBlockSchema, type SchemaToModel } from '@maxiee/block_store';

export type ParagraphType =
  | 'text'
  | 'quote'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export const ParagraphBlockSchema = defineBlockSchema({
  flavour: 'workbench:paragraph',
  props: internal => ({
    type: 'text' as ParagraphType,
    text: internal.Text(),
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: [
      'workbench:note',
      'workbench:database',
      'workbench:paragraph',
      'workbench:list',
      'workbench:edgeless-text',
    ],
  },
});

export type ParagraphBlockModel = SchemaToModel<typeof ParagraphBlockSchema>;
