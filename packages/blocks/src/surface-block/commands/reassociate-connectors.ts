import type { Command } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';

/**
 * Re-associate bindings for block that have been converted.
 *
 * @param oldId - the old block id
 * @param newId - the new block id
 */
export const reassociateConnectorsCommand: Command<
  never,
  never,
  { oldId: string; newId: string }
> = (ctx, next) => {
  const { oldId, newId } = ctx;
  assertExists(oldId, 'The old block ID is required!');
  assertExists(newId, 'The new block ID is required!');

  const service = ctx.std.spec.getService('workbench:surface');
  assertExists(service);

  const surface = service.surface;
  const connectors = surface.getConnectors(oldId);
  for (const { id, source, target } of connectors) {
    if (source.id === oldId) {
      surface.updateElement(id, {
        source: {
          ...source,
          id: newId,
        },
      });
      continue;
    }
    if (target.id === oldId) {
      surface.updateElement(id, {
        target: {
          ...target,
          id: newId,
        },
      });
    }
  }

  next();
};

declare global {
  namespace BlockKit {
    interface Commands {
      reassociateConnectors: typeof reassociateConnectorsCommand;
    }
  }
}
