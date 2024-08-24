import { css } from 'lit';

import { DRAG_HANDLE_CONTAINER_WIDTH } from './config.js';

export const styles = css`
  .workbench-drag-handle-widget {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    contain: size layout;
  }

  .workbench-drag-handle-container {
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    width: ${DRAG_HANDLE_CONTAINER_WIDTH}px;
    min-height: 12px;
    pointer-events: auto;
    user-select: none;
    box-sizing: border-box;
  }
  .workbench-drag-handle-container:hover {
    cursor: grab;
  }

  .workbench-drag-handle-grabber {
    width: 4px;
    height: 100%;
    border-radius: 1px;
    background: var(--workbench-placeholder-color);
    transition: width 0.25s ease;
  }

  @media print {
    .workbench-drag-handle-widget {
      display: none;
    }
  }
  .workbench-drag-hover-rect {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 6px;
    background: var(--workbench-hover-color);
    pointer-events: none;
    z-index: 2;
    animation: expand 0.25s forwards;
  }
  @keyframes expand {
    0% {
      width: 0;
      height: 0;
    }
  }
`;
