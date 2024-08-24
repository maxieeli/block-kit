import { html } from 'lit';

const styles = html`<style>
  .workbench-page-selected-embed-rects-container {
    position: absolute;
    border: 2px solid var(--workbench-primary-color);
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% + 1px);
    user-select: none;
    pointer-events: none;
    box-sizing: border-box;
    line-height: 0;
  }

  .workbench-page-selected-embed-rects-container .resize {
    position: absolute;
    padding: 5px;
    pointer-events: auto;
    z-index: 1;
  }

  .workbench-page-selected-embed-rects-container .resize-inner {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--workbench-primary-color);
    pointer-events: none;
  }

  .workbench-page-selected-embed-rects-container .resize.top-left {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize; /*resizer cursor*/
  }
  .workbench-page-selected-embed-rects-container .resize.top-right {
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }
  .workbench-page-selected-embed-rects-container .resize.bottom-left {
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }
  .workbench-page-selected-embed-rects-container .resize.bottom-right {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
</style>`;

export function ImageSelectedRect(readonly: boolean) {
  if (readonly) {
    return html`${styles}
      <div
        class="workbench-page-selected-embed-rects-container resizable resizes"
      ></div> `;
  }
  return html`
    ${styles}
    <div class="workbench-page-selected-embed-rects-container resizable resizes">
      <div class="resize top-left">
        <div class="resize-inner"></div>
      </div>
      <div class="resize top-right">
        <div class="resize-inner"></div>
      </div>
      <div class="resize bottom-left">
        <div class="resize-inner"></div>
      </div>
      <div class="resize bottom-right">
        <div class="resize-inner"></div>
      </div>
    </div>
  `;
}
