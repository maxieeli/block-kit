import { css } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';

const paragraphButtonStyle = css`
  .paragraph-button-icon > svg:nth-child(2) {
    transition-duration: 0.3s;
  }
  .paragraph-button-icon:is(:hover, :focus-visible, :active)
    > svg:nth-child(2) {
    transform: rotate(180deg);
  }

  .paragraph-panel {
    display: none;

    font-size: var(--workbench-font-sm);
    box-sizing: border-box;
    position: absolute;
    min-width: 173px;
    padding: 8px 4px;
    overflow-y: auto;

    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
    border-radius: 8px;
    z-index: var(--workbench-z-index-popover);
  }

  .highlight-icon > svg:nth-child(2) {
    transition-duration: 0.3s;
  }
  .highlight-icon:is(:hover, :focus-visible, :active) > svg:nth-child(2) {
    transform: rotate(180deg);
  }

  .highlight-panel {
    display: none;

    font-size: var(--workbench-font-sm);
    box-sizing: border-box;
    position: absolute;
    min-width: 178px;
    padding: 8px 4px 8px 8px;
    max-height: 380px;
    overflow-y: auto;

    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
    border-radius: 8px;
    z-index: var(--workbench-z-index-popover);
  }

  ${scrollbarStyle('.highlight-panel')}

  .highligh-panel-heading {
    color: var(--workbench-text-secondary-color);
    padding: 4px;
  }
`;

export const formatBarStyle = css`
  .workbench-format-bar-widget {
    box-sizing: border-box;
    position: absolute;
    display: none;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    height: 40px;
    width: max-content;

    border-radius: 8px;
    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
    z-index: var(--workbench-z-index-popover);
    user-select: none;
  }

  .divider {
    width: 1px;
    height: 24px;
    background-color: var(--workbench-border-color);
  }

  ${paragraphButtonStyle}
`;
