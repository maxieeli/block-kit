import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

export const styles = css`
  :host {
    box-sizing: border-box;
  }

  .workbench-reference-popover-container {
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

  .workbench-reference-popover {
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

  .workbench-reference-popover-open-button > svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .workbench-reference-popover-dividing-line {
    width: 1px;
    height: 24px;
    background-color: var(--workbench-border-color);
  }

  .workbench-reference-popover-view-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px;
    border-radius: 6px;
    background: var(--workbench-hover-color);
  }
  .workbench-reference-popover-view-selector > icon-button {
    padding: 0px;
  }
  .workbench-reference-popover-view-selector .current-view {
    background: var(--workbench-background-overlay-panel-color);
  }
`;
