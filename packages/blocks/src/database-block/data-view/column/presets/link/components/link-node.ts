import { ShadowlessElement } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isValidUrl } from '../../../../../../_common/utils/url.js';

@customElement('workbench-database-link-node')
export class LinkNode extends ShadowlessElement {
  static override styles = css`
    .link-node {
      word-break: break-all;
      color: var(--workbench-link-color);
      fill: var(--workbench-link-color);
      cursor: pointer;
      font-weight: normal;
      font-style: normal;
      text-decoration: none;
    }
  `;

  @property({ attribute: false })
  accessor link!: string;

  protected override render() {
    if (!isValidUrl(this.link)) {
      return html`<span class="normal-text">${this.link}</span>`;
    }

    return html`<a
      class="link-node"
      href=${this.link}
      rel="noopener noreferrer"
      target="_blank"
      ><span class="link-node-text">${this.link}</span></a
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-database-link-node': LinkNode;
  }
}