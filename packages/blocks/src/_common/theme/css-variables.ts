/* CSS variables. You need to handle all places where `CSS variables` are marked. */

export const ColorVariables = [
  '--workbench-brand-color',
  '--workbench-primary-color',
  '--workbench-secondary-color',
  '--workbench-tertiary-color',
  '--workbench-hover-color',
  '--workbench-icon-color',
  '--workbench-icon-secondary',
  '--workbench-border-color',
  '--workbench-divider-color',
  '--workbench-placeholder-color',
  '--workbench-quote-color',
  '--workbench-link-color',
  '--workbench-edgeless-grid-color',
  '--workbench-success-color',
  '--workbench-warning-color',
  '--workbench-error-color',
  '--workbench-processing-color',
  '--workbench-text-emphasis-color',
  '--workbench-text-primary-color',
  '--workbench-text-secondary-color',
  '--workbench-text-disable-color',
  '--workbench-black-10',
  '--workbench-black-30',
  '--workbench-black-50',
  '--workbench-black-60',
  '--workbench-black-80',
  '--workbench-black-90',
  '--workbench-black',
  '--workbench-white-10',
  '--workbench-white-30',
  '--workbench-white-50',
  '--workbench-white-60',
  '--workbench-white-80',
  '--workbench-white-90',
  '--workbench-white',
  '--workbench-background-code-block',
  '--workbench-background-tertiary-color',
  '--workbench-background-processing-color',
  '--workbench-background-error-color',
  '--workbench-background-warning-color',
  '--workbench-background-success-color',
  '--workbench-background-primary-color',
  '--workbench-background-secondary-color',
  '--workbench-background-modal-color',
  '--workbench-background-overlay-panel-color',
  '--workbench-tag-blue',
  '--workbench-tag-green',
  '--workbench-tag-teal',
  '--workbench-tag-white',
  '--workbench-tag-purple',
  '--workbench-tag-red',
  '--workbench-tag-pink',
  '--workbench-tag-yellow',
  '--workbench-tag-orange',
  '--workbench-tag-gray',
  '--workbench-palette-line-yellow',
  '--workbench-palette-line-orange',
  '--workbench-palette-line-tangerine',
  '--workbench-palette-line-red',
  '--workbench-palette-line-magenta',
  '--workbench-palette-line-purple',
  '--workbench-palette-line-navy',
  '--workbench-palette-line-blue',
  '--workbench-palette-line-teal',
  '--workbench-palette-line-green',
  '--workbench-palette-line-black',
  '--workbench-palette-line-grey',
  '--workbench-palette-line-white',
  '--workbench-palette-shape-yellow',
  '--workbench-palette-shape-orange',
  '--workbench-palette-shape-tangerine',
  '--workbench-palette-shape-red',
  '--workbench-palette-shape-magenta',
  '--workbench-palette-shape-purple',
  '--workbench-palette-shape-navy',
  '--workbench-palette-shape-blue',
  '--workbench-palette-shape-teal',
  '--workbench-palette-shape-green',
  '--workbench-palette-shape-black',
  '--workbench-palette-shape-grey',
  '--workbench-palette-shape-white',
  '--workbench-tooltip',
  '--workbench-blue',
];

export const SizeVariables = [
  '--workbench-font-h-1',
  '--workbench-font-h-2',
  '--workbench-font-h-3',
  '--workbench-font-h-4',
  '--workbench-font-h-5',
  '--workbench-font-h-6',
  '--workbench-font-base',
  '--workbench-font-sm',
  '--workbench-font-xs',
  '--workbench-line-height',
  '--workbench-z-index-modal',
  '--workbench-z-index-popover',
];

export const FontFamilyVariables = [
  '--workbench-font-family',
  '--workbench-font-number-family',
  '--workbench-font-code-family',
];

export const StyleVariables = [
  '--workbench-editor-width',

  '--workbench-theme-mode',
  '--workbench-editor-mode',
  /* --workbench-palette-transparent: special values added for the sake of logical consistency. */
  '--workbench-palette-transparent',

  '--workbench-popover-shadow',
  '--workbench-menu-shadow',
  '--workbench-float-button-shadow',
  '--workbench-shadow-1',
  '--workbench-shadow-2',
  '--workbench-shadow-3',

  '--workbench-paragraph-space',
  '--workbench-popover-radius',
  '--workbench-scale',
  ...SizeVariables,
  ...ColorVariables,
  ...FontFamilyVariables,
] as const;

type VariablesType = typeof StyleVariables;
export type CssVariableName = Extract<
  VariablesType[keyof VariablesType],
  string
>;

export type CssVariablesMap = Record<CssVariableName, string>;

export function isCssVariable(name: string): name is CssVariableName {
  return StyleVariables.includes(name as CssVariableName);
}

export function isTransparent(color: CssVariableName) {
  return color.toLowerCase() === '--workbench-palette-transparent';
}
