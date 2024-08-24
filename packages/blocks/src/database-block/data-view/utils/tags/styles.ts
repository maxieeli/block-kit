import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

export const styles = css`
  workbench-multi-tag-select {
    position: absolute;
    z-index: 2;
    border: 1px solid var(--workbench-border-color);
    border-radius: 8px;
    background: var(--workbench-background-primary-color);
    box-shadow: var(--workbench-shadow-2);
    font-family: var(--workbench-font-family);
    min-width: 300px;
    max-width: 720px;
  }

  .workbench-select-cell-select {
    font-size: var(--workbench-font-sm);
  }

  @media print {
    .workbench-select-cell-select {
      display: none;
    }
  }

  .select-input-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 44px;
    padding: 10px 8px;
    background: var(--workbench-hover-color);
    border-radius: 8px;
  }

  .select-input {
    flex: 1 1 0;
    height: 24px;
    border: none;
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    color: inherit;
    background: transparent;
    line-height: 24px;
  }

  .select-input:focus {
    outline: none;
  }

  .select-input::placeholder {
    color: var(--workbench-placeholder-color);
  }

  .select-option-container {
    padding: 8px;
    color: var(--workbench-black-90);
    fill: var(--workbench-black-90);
    max-height: 400px;
    overflow-y: auto;
  }

  .select-option-container-header {
    padding: 0px 4px 8px 4px;
    color: var(--workbench-black-60);
    font-size: 12px;
    user-select: none;
  }

  .select-input-container .select-selected {
    display: flex;
    align-items: center;
    padding: 2px 10px;
    gap: 10px;
    height: 28px;
    background: var(--workbench-tag-white);
    border-radius: 4px;
    color: var(--workbench-black-90);
    background: var(--workbench-tertiary-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-selected-text {
    width: calc(100% - 16px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-selected > .close-icon {
    display: flex;
    align-items: center;
  }

  .select-selected > .close-icon:hover {
    cursor: pointer;
  }

  .select-selected > .close-icon > svg {
    fill: var(--workbench-black-90);
  }

  .select-option-new {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 36px;
    padding: 4px;
    gap: 5px;
    border-radius: 4px;
    background: var(--workbench-selected-color);
  }

  .select-option-new-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 28px;
    padding: 2px 10px;
    border-radius: 4px;
    background: var(--workbench-tag-red);
  }

  .select-option-new-icon {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    color: var(--workbench-text-primary-color);
    margin-right: 8px;
  }

  .select-option-new-icon svg {
    width: 16px;
    height: 16px;
  }

  .select-option {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    margin-bottom: 4px;
    cursor: pointer;
  }

  .select-option.selected {
    background: var(--workbench-hover-color);
  }

  .select-option-text-container {
    width: 100%;
    overflow: hidden;
    display: flex;
  }

  .select-option-group-name {
    font-size: 9px;
    padding: 0 2px;
    border-radius: 2px;
  }

  .select-option-name {
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-option-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 3px;
    cursor: pointer;
    opacity: 0;
  }

  .select-option.selected .select-option-icon {
    opacity: 1;
  }

  .select-option-icon:hover {
    background: var(--workbench-hover-color);
  }

  .select-option-icon svg {
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
`;
