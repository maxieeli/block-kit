import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

export const renameStyles = css`
  .workbench-attachment-rename-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 340px;

    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    color: var(--workbench-text-primary-color);
    border-radius: 8px;
    padding: 12px;
    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
    z-index: var(--workbench-z-index-popover);
  }

  .workbench-attachment-rename-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 4px 10px;
    gap: 8px;

    border-radius: 8px;
    border: var(--workbench-border-color) solid 1px;
  }

  .workbench-attachment-rename-input-wrapper input {
    width: 100%;
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
  }

  .workbench-attachment-rename-extension {
    font-size: var(--workbench-font-xs);
    color: var(--workbench-text-secondary-color);
  }

  .workbench-attachment-rename-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--workbench-z-index-popover);
  }
`;

export const moreMenuStyles = css`
  .workbench-attachment-options-more {
    box-sizing: border-box;
    padding-bottom: 4px;
  }

  .workbench-attachment-options-more-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--workbench-text-primary-color);

    border-radius: 8px;
    padding: 8px;
    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
  }

  .workbench-attachment-options-more-container > icon-button {
    display: flex;
    align-items: center;
    padding: 8px;
    gap: 8px;
  }
  .workbench-attachment-options-more-container > icon-button[hidden] {
    display: none;
  }

  .workbench-attachment-options-more-container > icon-button:hover.danger {
    background: var(--workbench-background-error-color);
    color: var(--workbench-error-color);
  }
  .workbench-attachment-options-more-container > icon-button:hover.danger > svg {
    color: var(--workbench-error-color);
  }
`;

export const styles = css`
  :host {
    z-index: 1;
  }

  .workbench-attachment-options {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    gap: 4px;
    border-radius: 8px;
    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
  }

  .workbench-attachment-options .divider {
    width: 1px;
    margin: 0 1.5px;
    height: 24px;
    background-color: var(--workbench-border-color);
  }

  .workbench-attachment-options > div[hidden],
  icon-button[hidden] {
    display: none;
  }
`;
