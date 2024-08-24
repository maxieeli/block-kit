import { BlockService } from '@maxiee/block-std';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type WorkbenchTextAttributes,
  getWorkbenchInlineSpecsWithReference,
} from '../_common/inline/presets/workbench-inline-specs.js';
import { workbenchInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
import type { ParagraphBlockModel } from './paragraph-model.js';

export class ParagraphBlockService<
  TextAttributes extends WorkbenchTextAttributes = WorkbenchTextAttributes,
> extends BlockService<ParagraphBlockModel> {
  readonly inlineManager = new InlineManager<TextAttributes>();

  readonly referenceNodeConfig = new ReferenceNodeConfig();

  override mounted(): void {
    super.mounted();

    this.referenceNodeConfig.setDoc(this.doc);

    const inlineSpecs = getWorkbenchInlineSpecsWithReference(
      this.referenceNodeConfig
    );
    this.inlineManager.registerSpecs(inlineSpecs);
    this.inlineManager.registerMarkdownMatches(workbenchInlineMarkdownMatches);
  }

  placeholderGenerator: (model: ParagraphBlockModel) => string = model => {
    if (model.type === 'text') {
      return "Type '/' for commands";
    }

    const placeholders = {
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6',
      quote: '',
    };
    return placeholders[model.type];
  };
}
