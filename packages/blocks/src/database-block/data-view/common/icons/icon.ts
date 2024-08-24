import { ShadowlessElement } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as icons from './index.js';

@customElement('workbench-lit-icon')
export class WorkbenchLitIcon extends ShadowlessElement {
  static override styles = css`
    workbench-lit-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    workbench-lit-icon svg {
      fill: var(--workbench-icon-color);
    }
  `;

  @property({ attribute: false })
  accessor name!: keyof typeof icons;

  protected override render(): unknown {
    return html`${icons[this.name]}`;
  }
}
