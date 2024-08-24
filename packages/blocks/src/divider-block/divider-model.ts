import { defineBlockSchema, type SchemaToModel } from '@maxiee/block_store';

export const DividerBlockSchema = defineBlockSchema({
  flavour: 'workbench:divider',
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type DividerBlockModel = SchemaToModel<typeof DividerBlockSchema>;
