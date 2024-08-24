import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

export const styles = css`
  workbench-block-hub {
    position: absolute;
    z-index: 3;
    user-select: none;
  }

  @media print {
    workbench-block-hub {
      display: none;
    }
  }

  .block-hub-cards-container {
    width: 274px;
    position: absolute;
    right: calc(100% + 4px);
    overflow-y: unset;
    display: none;
    fill: var(--workbench-icon-color);
    color: var(--workbench-icon-color);
    font-size: var(--workbench-font-sm);
    background: var(--workbench-background-overlay-panel-color);
    box-shadow: var(--workbench-menu-shadow);
    border-radius: 8px;
  }

  .block-hub-cards-container[type='text'] {
    top: unset;
    bottom: 0;
  }

  .visible {
    display: block;
  }

  .invisible {
    display: none;
  }

  .card-container-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .card-container {
    display: flex;
    position: relative;
    align-items: center;
    width: 250px;
    height: 54px;
    background: var(--workbench-white-80);
    box-shadow: var(--workbench-shadow-1);
    border-radius: 8px;
    margin-bottom: 12px;
    cursor: grab;
    top: 0;
    left: 0;
    transition: all 0.1s ease-in-out;
  }

  .card-icon-container {
    display: flex;
    align-items: center;
    position: absolute;
    right: 12px;
  }

  .card-icon-container > svg {
    width: 20px;
    height: 20px;
  }

  .card-container-inner:hover .card-container {
    background: var(--workbench-hover-color);
    top: -2px;
    left: -2px;
  }

  .card-container-inner:hover .card-container.grabbing {
    top: unset;
    left: unset;
    box-shadow: var(--workbench-shadow-2);
  }

  .card-description-container {
    display: block;
    width: 190px;
    color: var(--workbench-text-primary-color);
    font-size: var(--workbench-font-base);
    line-height: var(--workbench-line-height);
    margin: 8px 0 8px 12px;
    text-align: justify;
  }

  .block-hub-cards-container .description {
    font-size: var(--workbench-font-sm);
    line-height: var(--workbench-line-height);
    color: var(--workbench-text-secondary-color);
    white-space: pre;
  }

  .grabbing {
    cursor: grabbing;
  }

  .grab {
    cursor: grab;
  }

  .block-hub-cards-title-container {
    margin: 16px 0 20px 12px;
    color: var(--workbench-text-secondary-color);
    font-size: var(--workbench-font-base);
  }

  .prominent {
    z-index: 1;
  }

  .block-hub-menu-container {
    display: flex;
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 44px;
    background: var(--workbench-background-primary-color);
    border-radius: 8px;
  }

  .block-hub-menu-container[expanded] {
    box-shadow: var(--workbench-menu-shadow);
    background: var(--workbench-background-overlay-panel-color);
  }

  .block-hub-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    border-radius: 4px;
    color: var(--workbench-icon-color);
    height: 36px;
  }

  .block-hub-icon-container svg {
    width: 24px;
    height: 24px;
  }

  .block-hub-icon-container[selected='true'] {
    background: var(--workbench-hover-color);
  }

  .block-hub-icon-container:hover {
    background: var(--workbench-hover-color);
    border-radius: 4px;
  }

  .new-icon {
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: var(--workbench-icon-color);
  }

  .new-icon-in-edgeless {
    box-shadow: var(--workbench-menu-shadow);
  }

  .block-hub-menu-container[expanded] .new-icon {
    border-radius: 4px;
    box-shadow: unset;
  }

  .new-icon:hover {
    box-shadow: var(--workbench-menu-shadow);
    background: var(--workbench-white);
  }

  .icon-expanded {
    width: 36px;
    height: 36px;
  }

  .icon-expanded:hover {
    background: var(--workbench-hover-color);
  }

  .block-hub-icons-container {
    width: 100%;
    overflow: hidden;
    transition: all 0.2s cubic-bezier(0, 0, 0.55, 1.6);
  }

  .block-hub-icons-container > .divider {
    height: 1px;
    width: 36px;
    background: var(--workbench-border-color);
    margin: 4px 0;
  }
`;
