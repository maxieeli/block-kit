import { BlockService } from '@maxiee/block-std';
import { assertExists } from '@maxiee/block_global/utils';
import type { BlockModel, Doc } from '@maxiee/block_store';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type WorkbenchTextAttributes,
  getWorkbenchInlineSpecsWithReference,
} from '../_common/inline/presets/workbench-inline-specs.js';
import { workbenchInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
import { DatabaseSelection } from './data-view/common/selection.js';
import { viewPresets } from './data-view/index.js';
import type { ViewMeta } from './data-view/view/data-view.js';
import type { DatabaseBlockModel } from './database-model.js';
import { databaseViewInitEmpty, databaseViewInitTemplate } from './utils.js';

export class DatabaseBlockService<
  TextAttributes extends WorkbenchTextAttributes = WorkbenchTextAttributes,
> extends BlockService<DatabaseBlockModel> {
  readonly inlineManager = new InlineManager<TextAttributes>();

  readonly referenceNodeConfig = new ReferenceNodeConfig();

  databaseViewInitEmpty = databaseViewInitEmpty;

  viewPresets = viewPresets;

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

  initDatabaseBlock(
    doc: Doc,
    model: BlockModel,
    databaseId: string,
    viewMeta: ViewMeta,
    isAppendNewRow = true
  ) {
    const blockModel = doc.getBlockById(databaseId) as DatabaseBlockModel;
    assertExists(blockModel);
    databaseViewInitTemplate(blockModel, viewMeta);
    if (isAppendNewRow) {
      // Add a paragraph after database
      const parent = doc.getParent(model);
      assertExists(parent);
      doc.addBlock('workbench:paragraph', {}, parent.id);
    }
    blockModel.applyColumnUpdate();
  }
}
