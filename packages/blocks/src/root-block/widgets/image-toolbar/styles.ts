import { css } from 'lit';

export const styles = css`
  :host {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
  }

  .workbench-image-toolbar-container {
    display: flex;
    flex-direction: row;
    gap: 4px;
    box-sizing: border-box;
    list-style: none;
    padding: 4px;
    margin: 0;
  }

  .image-toolbar-button {
    background: var(--workbench-white);
    color: var(--workbench-icon-color);
    box-shadow: var(--workbench-shadow-1);
    border-radius: 4px;
  }

  .image-toolbar-button:hover {
    background: var(--workbench-hover-color-filled);
  }

  .image-toolbar-button.more {
    position: relative;
  }
`;
