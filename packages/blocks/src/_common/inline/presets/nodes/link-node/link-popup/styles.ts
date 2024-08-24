import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

const editLinkStyle = css`
  .workbench-link-edit-popover {
    box-sizing: border-box;
    width: 404px;
    height: 112px;
    padding: 12px;
    box-shadow: var(--workbench-shadow-2);
    background: var(--workbench-background-overlay-panel-color);
    border-radius: 8px;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: repeat(2, 1fr);
    gap: 12px;
    grid-template-areas:
      'text-area .'
      'link-area btn';
    justify-items: center;
    align-items: center;
    /* breaks 'basic link' test in chromium */
    /* user-select: none; */
  }

  .workbench-link-edit-popover label {
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    font-size: var(--workbench-font-sm);
    box-sizing: border-box;
    padding: 6px 0 6px 12px;
    color: var(--workbench-icon-color);
  }

  .workbench-link-edit-popover input {
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    font-size: var(--workbench-font-base);
    box-sizing: border-box;
    padding: 6px 12px 6px 0;
    width: 260px;
    height: 34px;
    color: inherit;
    border: none;
    background: transparent;
  }
  .workbench-link-edit-popover input::placeholder {
    color: var(--workbench-placeholder-color);
  }
  input:focus {
    outline: none;
  }
  .workbench-link-edit-popover input:focus ~ label,
  .workbench-link-edit-popover input:active ~ label {
    color: var(--workbench-primary-color);
  }

  .workbench-edit-text-area {
    grid-area: text-area;
    width: 338px;
    display: grid;
    gap: 6px;
    grid-template-columns: auto auto auto;
    grid-template-rows: repeat(1, 1fr);
    grid-template-areas: 'text span text-input';
    justify-items: center;
    align-items: center;
    user-select: none;
  }
  .workbench-edit-text-area {
    border: 1px solid var(--workbench-border-color);
    outline: none;
    border-radius: 10px;
    background: transparent;
  }

  .workbench-edit-text-area:focus-within {
    border: 1px solid var(--workbench-primary-color);
  }

  .workbench-edit-link-area {
    grid-area: link-area;
    width: 338px;
    display: grid;
    gap: 6px;
    grid-template-columns: auto auto auto;
    grid-template-rows: repeat(1, 1fr);
    grid-template-areas: 'link span link-input';
    justify-items: center;
    align-items: center;
  }
  .workbench-edit-link-area {
    border: 1px solid var(--workbench-border-color);
    outline: none;
    border-radius: 10px;
    background: transparent;
  }
  .workbench-edit-link-area:focus-within {
    border: 1px solid var(--workbench-primary-color);
  }

  .workbench-link-popover-dividing-line {
    grid-area: span;
  }
  .workbench-edit-text-text {
    grid-area: text;
  }

  .workbench-edit-text-input {
    grid-area: text-input;
  }

  .workbench-edit-link-text {
    grid-area: link;
  }

  .workbench-edit-link-input {
    grid-area: link-input;
  }

  .workbench-confirm-button {
    grid-area: btn;
    user-select: none;
  }
`;

export const linkPopupStyle = css`
  :host {
    box-sizing: border-box;
  }

  .mock-selection {
    position: absolute;
    background-color: rgba(35, 131, 226, 0.28);
  }

  .workbench-link-popover-container {
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    font-size: var(--workbench-font-base);
    font-style: normal;
    line-height: 24px;
    color: var(--workbench-text-primary-color);
    z-index: var(--workbench-z-index-popover);
    animation: workbench-popover-fade-in 0.2s ease;
    position: absolute;
  }

  @keyframes workbench-popover-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .workbench-link-popover-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--workbench-z-index-popover);
  }

  .workbench-link-popover {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    height: 40px;

    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
    border-radius: 8px;
  }

  .workbench-link-preview {
    display: flex;
    width: 180px;
    padding: var(--1, 0px);
    align-items: flex-start;
    gap: 10px;
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
    user-select: none;
    cursor: pointer;
  }

  .workbench-link-popover-input {
    background: transparent;
    border: none;
  }
  .workbench-link-popover-input::placeholder {
    color: var(--workbench-placeholder-color);
  }
  .workbench-link-popover-input:focus {
    border: none;
  }

  .workbench-link-preview > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    color: var(--workbench-link-color);
    font-feature-settings:
      'clig' off,
      'liga' off;
    font-family: var(--workbench-font-family);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    text-overflow: ellipsis;
    overflow: hidden;
    opacity: var(--add, 1);
  }

  .workbench-link-popover-dividing-line {
    margin: 0 6px;
    width: 1px;
    height: 20px;
    background-color: var(--workbench-border-color);
  }

  .workbench-link-popover-view-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px;
    border-radius: 6px;
    background: var(--workbench-hover-color);
  }
  .workbench-link-popover-view-selector > icon-button {
    padding: 0px;
  }
  .workbench-link-popover-view-selector .current-view {
    background: var(--workbench-background-overlay-panel-color);
  }

  ${editLinkStyle}
`;
