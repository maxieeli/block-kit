import { ShadowlessElement, WithDisposable } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('workbench-edgeless-image')
export class ImageBlockEdgelessComponent extends WithDisposable(
  ShadowlessElement
) {
  static override styles = css`
    workbench-edgeless-image .resizable-img,
    workbench-edgeless-image .resizable-img img {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ attribute: false })
  accessor url: string | undefined = undefined;

  @query('.resizable-img')
  public accessor resizeImg: HTMLElement | null = null;

  private _handleError(error: Error) {
    this.dispatchEvent(new CustomEvent('error', { detail: error }));
  }

  override render() {
    return html`<div class="resizable-img">
      <img
        class="drag-target"
        src=${this.url ?? ''}
        draggable="false"
        @error=${this._handleError}
      />
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-edgeless-image': ImageBlockEdgelessComponent;
  }
}
