import { BlockService } from '@maxiee/block-std';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type WorkbenchTextAttributes,
  getWorkbenchInlineSpecsWithReference,
} from '../_common/inline/presets/workbench-inline-specs.js';
import { workbenchInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
import type { ListBlockModel } from './list-model.js';
import { listPrefix, toggleStyles } from './styles.js';
import { ListIcon } from './utils/get-list-icon.js';

export class ListBlockService<
  TextAttributes extends WorkbenchTextAttributes = WorkbenchTextAttributes,
> extends BlockService<ListBlockModel> {
  readonly inlineManager = new InlineManager<TextAttributes>();

  readonly referenceNodeConfig = new ReferenceNodeConfig();

  readonly styles = {
    icon: ListIcon,
    prefix: listPrefix,
    toggle: toggleStyles,
  };

  override mounted(): void {
    super.mounted();

    this.referenceNodeConfig.setDoc(this.doc);

    const inlineSpecs = getWorkbenchInlineSpecsWithReference(
      this.referenceNodeConfig
    );
    this.inlineManager.registerSpecs(inlineSpecs);
    this.inlineManager.registerMarkdownMatches(workbenchInlineMarkdownMatches);
  }
}
