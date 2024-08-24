import { WidgetElement } from '@maxiee/block-std';
import { customElement } from 'lit/decorators.js';

import { BlockHub } from './components/block-hub.js';
import { styles } from './styles.js';

export const WORKBENCH_BLOCK_HUB_WIDGET = 'workbench-block-hub-widget';

@customElement(WORKBENCH_BLOCK_HUB_WIDGET)
export class BlockHubWidget extends WidgetElement {
  static override styles = styles;

  override connectedCallback() {
    super.connectedCallback();

    // FIXME(Flrande): It is not a best practice,
    // but merely a temporary measure for reusing previous components.
    const blockHub = new BlockHub(this.host);
    document.body.append(blockHub);

    this.disposables.add(() => blockHub.remove());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_BLOCK_HUB_WIDGET]: BlockHubWidget;
  }
}
