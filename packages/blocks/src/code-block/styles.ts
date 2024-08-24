import { css } from 'lit';

export const codeBlockStyles = css`
  workbench-code {
    position: relative;
    z-index: 1;
  }

  .workbench-code-block-container {
    font-size: var(--workbench-font-sm);
    line-height: var(--workbench-line-height);
    position: relative;
    padding: 32px 24px;
    margin-bottom: 4px;
    background: var(--workbench-background-code-block);
    border-radius: 10px;
    box-sizing: border-box;
  }

  .workbench-code-block-container .inline-editor {
    font-family: var(--workbench-font-code-family);
    font-variant-ligatures: none;
  }

  .workbench-code-block-container rich-text {
    /* to make sure the resize observer can be triggered as expected */
    display: block;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    width: 90%;
  }

  .workbench-code-block-container .rich-text-container {
    position: relative;
    border-radius: 4px;
    padding: 0px 24px 0px 30px;
  }

  #line-numbers {
    position: absolute;
    left: 0px;
    line-height: var(--workbench-line-height);
    font-size: var(--workbench-font-sm);
    color: var(--workbench-text-secondary-color);
    font-family: var(--workbench-font-code-family);
  }

  .workbench-code-block-container.wrap #line-numbers {
    top: calc(var(--workbench-line-height) + 4px);
  }

  .workbench-code-block-container.wrap #line-numbers > div {
    margin-top: calc(var(--top, 0) / 1 - var(--workbench-line-height));
  }
`;
