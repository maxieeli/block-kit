import type { RootBlockComponent } from '../types.js';

export function getClosestRootBlockComponent(
  el: HTMLElement
): RootBlockComponent | null {
  return el.closest('workbench-edgeless-root, workbench-page-root');
}
