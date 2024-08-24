import { css } from 'lit';

export const dividerBlockStyles = css`
  .workbench-divider-block-container {
    position: relative;
    width: 100%;
    height: 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 18px 8px;
    margin-top: var(--workbench-paragraph-space);
  }
  hr {
    border: none;
    border-top: 1px solid var(--workbench-divider-color);
    width: 100%;
  }
`;
