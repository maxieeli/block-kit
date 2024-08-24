import { css } from 'lit';

export const listPrefix = css`
  .workbench-list-block__prefix {
    display: flex;
    color: var(--workbench-blue-700);
    font-size: var(--workbench-font-sm);
    user-select: none;
    position: relative;
  }

  .workbench-list-block__numbered {
    min-width: 22px;
    height: 24px;
    margin-left: 2px;
  }

  .workbench-list-block__todo-prefix {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: var(--workbench-icon-color);
  }

  .workbench-list-block__todo-prefix > svg {
    width: 20px;
    height: 20px;
  }
`;

export const toggleStyles = css`
  .toggle-icon {
    display: flex;
    align-items: center;
    height: 16px;
    margin: 4px 0;
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .toggle-icon:hover {
    background: var(--workbench-hover-color);
  }
  .workbench-list-rich-text-wrapper:hover .toggle-icon {
    opacity: 1;
  }
  .toggle-icon__collapsed {
    opacity: 1;
  }

  .with-drag-handle .workbench-list-rich-text-wrapper .toggle-icon {
    opacity: 1;
  }
  .with-drag-handle .workbench-block-children-container .toggle-icon {
    opacity: 0;
  }
`;

export const listBlockStyles = css`
  workbench-list {
    display: block;
    font-size: var(--workbench-font-base);
  }

  .workbench-list-block-container {
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  }
  .workbench-list-block-container .workbench-list-block-container {
    margin-top: 0;
  }
  .workbench-list-rich-text-wrapper {
    position: relative;
    display: flex;
  }
  .workbench-list-rich-text-wrapper rich-text {
    flex: 1;
  }

  .workbench-list--checked {
    color: var(--workbench-text-secondary-color);
  }

  ${listPrefix}
  ${toggleStyles}
`;
