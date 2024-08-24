import { GroupElementModel } from '../../../surface-block/index.js';
export function getElementsWithoutGroup(
  elements: BlockKit.EdgelessModelType[]
) {
  const set = new Set<BlockKit.EdgelessModelType>();

  elements.forEach(element => {
    if (element instanceof GroupElementModel) {
      element.descendants().forEach(child => set.add(child));
    } else {
      set.add(element);
    }
  });
  return Array.from(set);
}
