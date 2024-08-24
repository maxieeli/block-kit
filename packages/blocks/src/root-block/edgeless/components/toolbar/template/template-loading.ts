import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('workbench-template-loading')
export class WorkbenchTemplateLoading extends LitElement {
  static override styles = css`
    @keyframes workbench-template-block-rotate {
      from {
        rotate: 0deg;
      }
      to {
        rotate: 360deg;
      }
    }

    .workbench-template-block-container {
      width: 20px;
      height: 20px;
      overflow: hidden;
    }

    .workbench-template-block-loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      position: relative;
      background: conic-gradient(
        rgba(30, 150, 235, 1) 90deg,
        rgba(0, 0, 0, 0.1) 90deg 360deg
      );
      border-radius: 50%;
      animation: workbench-template-block-rotate 1s infinite ease-in;
    }

    .workbench-template-block-loading::before {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: white;
      position: absolute;
      top: 3px;
      left: 3px;
    }
  `;

  override render() {
    return html`<div class="workbench-template-block-container">
      <div class="workbench-template-block-loading"></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-template-loading': WorkbenchTemplateLoading;
  }
}
