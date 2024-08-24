import { defineBlockSchema, type SchemaToModel } from '@maxiee/block_store';

export type ListType = 'bulleted' | 'numbered' | 'todo' | 'toggle';

declare const BackwardUndefined: unique symbol;
/**
 * The `collapsed` property may be `undefined` due to legacy data,
 * but you should not manually set it to undefined.
 */
type ListCollapsed = boolean | typeof BackwardUndefined;

export const ListBlockSchema = defineBlockSchema({
  flavour: 'workbench:list',
  props: internal => ({
    type: 'bulleted' as ListType,
    text: internal.Text(),
    checked: false,
    collapsed: false as ListCollapsed,
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: [
      'workbench:note',
      'workbench:database',
      'workbench:list',
      'workbench:paragraph',
      'workbench:edgeless-text',
    ],
  },
});

export type ListBlockModel = SchemaToModel<typeof ListBlockSchema>;
