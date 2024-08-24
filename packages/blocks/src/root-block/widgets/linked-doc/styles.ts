import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';

export const styles = css`
  :host {
    position: absolute;
  }

  .linked-doc-popover {
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    font-size: var(--workbench-font-base);
    padding: 12px 8px;
    display: flex;
    flex-direction: column;

    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-shadow-2);
    border-radius: 12px;
    z-index: var(--workbench-z-index-popover);
  }

  .linked-doc-popover icon-button {
    padding: 8px;
    justify-content: flex-start;
    gap: 8px;
  }

  .linked-doc-popover .group-title {
    color: var(--workbench-text-secondary-color);
    margin: 8px 12px;
  }

  .linked-doc-popover .divider {
    margin: 6px 12px;
    height: 1px;
    background: var(--workbench-border-color);
  }

  ${scrollbarStyle('.linked-doc-popover .group')}
`;
