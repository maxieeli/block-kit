import { BlockService } from '@maxiee/block-std';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type WorkbenchTextAttributes,
  getWorkbenchInlineSpecsWithReference,
} from '../_common/inline/presets/workbench-inline-specs.js';
import { workbenchInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
import { DatabaseSelection } from '../database-block/data-view/index.js';
import type { DataViewBlockModel } from './data-view-model.js';

export class DataViewBlockService<
  TextAttributes extends WorkbenchTextAttributes = WorkbenchTextAttributes,
> extends BlockService<DataViewBlockModel> {
  readonly inlineManager = new InlineManager<TextAttributes>();

  readonly referenceNodeConfig = new ReferenceNodeConfig();

  override mounted(): void {
    super.mounted();
    this.selectionManager.register(DatabaseSelection);

    this.referenceNodeConfig.setDoc(this.doc);

    const inlineSpecs = getWorkbenchInlineSpecsWithReference(
      this.referenceNodeConfig
    );
    this.inlineManager.registerSpecs(inlineSpecs);
    this.inlineManager.registerMarkdownMatches(workbenchInlineMarkdownMatches);
  }
}
