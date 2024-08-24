import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

import { scrollbarStyle } from '../utils.js';
export const filterableListStyles = css`
  :host {
    background: var(--workbench-background-overlay-panel-color);
    color: var(--workbench-text-primary-color);
    box-shadow: var(--workbench-menu-shadow);
    border-radius: 12px;

    display: flex;
    flex-direction: column;

    max-height: 100%;
    width: 230px;
    pointer-events: auto;
    overflow: hidden;
    z-index: var(--workbench-z-index-popover);
  }

  .workbench-filterable-list {
    box-sizing: border-box;
    display: flex;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
    border-radius: 8px;
    padding: 8px;
  }

  .workbench-filterable-list.flipped {
    flex-direction: column-reverse;
  }

  .items-container {
    flex: 1;
    overflow-y: scroll;
    padding-top: 5px;
    padding-left: 4px;
    padding-right: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .divider {
    height: 1px;
    background-color: var(--workbench-divider-color);
    margin: 8px 0;
    flex-shrink: 0;
  }

  .input-wrapper {
    display: flex;
    margin-left: 4px;
    border-radius: 4px;
    padding: 4px 10px;
    gap: 4px;
    border: 1px solid transparent;
  }

  .input-wrapper:focus-within {
    border: 1px solid var(--workbench-blue-600);
    box-shadow: var(--workbench-active-shadow);
  }

  ${scrollbarStyle('.items-container')}

  .filterable-item {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    padding: 12px;
  }

  .filterable-item > div[slot='suffix'] {
    display: flex;
    align-items: center;
  }

  .filterable-item svg {
    width: 20px;
    height: 20px;
  }

  .filterable-item.focussed {
    color: var(--workbench-blue-600);
    background: var(--workbench-hover-color-filled);
  }

  #filter-input {
    flex: 1;
    align-items: center;
    height: 20px;
    width: 140px;
    border-radius: 8px;
    padding-top: 2px;
    border: none;
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    font-size: var(--workbench-font-sm);
    box-sizing: border-box;
    color: inherit;
    background: var(--workbench-background-overlay-panel-color);
  }

  #filter-input:focus {
    outline: none;
  }

  #filter-input::placeholder {
    color: var(--workbench-placeholder-color);
    font-size: var(--workbench-font-sm);
  }

  .search-icon {
    display: flex;
    align-items: center;
    color: var(--workbench-icon-color);
  }
`;
