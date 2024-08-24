import type { BlockModel, Doc } from '@maxiee/block_store';
import { minimatch } from 'minimatch';

export function assertFlavours(model: { flavour: string }, allowed: string[]) {
  if (!allowed.includes(model.flavour)) {
    throw new Error(`model flavour ${model.flavour} is not allowed`);
  }
}

export function matchFlavours<Key extends (keyof BlockKit.BlockModels)[]>(
  model: BlockModel | null,
  expected: Key
): model is BlockKit.BlockModels[Key[number]] {
  return (
    !!model &&
    expected.some(key =>
      minimatch(model.flavour as keyof BlockKit.BlockModels, key)
    )
  );
}

export function isInsideBlockByFlavour(
  doc: Doc,
  block: BlockModel | string,
  flavour: string
): boolean {
  const parent = doc.getParent(block);
  if (parent === null) {
    return false;
  }
  if (flavour === parent.flavour) {
    return true;
  }
  return isInsideBlockByFlavour(doc, parent, flavour);
}
