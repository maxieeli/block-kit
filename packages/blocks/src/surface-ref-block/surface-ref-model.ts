import { defineBlockSchema, type SchemaToModel } from '@maxiee/block_store';

type SurfaceRefProps = {
  reference: string;
  caption: string;
  refFlavour: string;
};

export const SurfaceRefBlockSchema = defineBlockSchema({
  flavour: 'workbench:surface-ref',
  props: () =>
    ({
      reference: '',
      caption: '',
    }) as SurfaceRefProps,
  metadata: {
    version: 1,
    role: 'content',
    parent: ['workbench:note'],
  },
});

export type SurfaceRefBlockModel = SchemaToModel<typeof SurfaceRefBlockSchema>;