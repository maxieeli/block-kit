export const dataViewCssVariable = () => {
  return `
  --data-view-cell-text-size:14px;
  --data-view-cell-text-line-height:22px;
`;
};
export const dataViewCommonStyle = (selector: string) => `
  ${selector}{
    ${dataViewCssVariable()}
  }
  .with-data-view-css-variable{
    ${dataViewCssVariable()}
    font-family: var(--workbench-font-family)
  }
  .dv-pd-2{
    padding:2px;
  }
  .dv-pd-4{
    padding:4px;
  }
  .dv-pd-8{
    padding:8px;
  }
  .dv-hover:hover{
    background-color: var(--workbench-hover-color);
    cursor: pointer;
  }
  .dv-icon-16 svg{
    width: 16px;
    height: 16px;
    color: var(--workbench-icon-color);
    fill: var(--workbench-icon-color);
  }
  .dv-icon-20 svg{
    width: 20px;
    height: 20px;
    color: var(--workbench-icon-color);
    fill: var(--workbench-icon-color);
  }
  .dv-border{
    border: 1px solid var(--workbench-border-color);
  }
  .dv-round-4{
    border-radius: 4px;
  }
  .dv-round-8{
    border-radius: 8px;
  }
  .dv-color-2{
    color: var(--workbench-text-secondary-color);
  }
  .dv-shadow-2{
    box-shadow: var(--workbench-shadow-2)
  }
  .dv-divider-h{
    height: 1px;
    background-color: var(--workbench-divider-color);
    margin: 8px 0;
  }
`;
