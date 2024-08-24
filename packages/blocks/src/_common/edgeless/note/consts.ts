import { createZodUnion } from '../../utils/index.js';

export const NOTE_BACKGROUND_COLORS = [
  '--workbench-palette-transparent',
  '--workbench-note-background-yellow',
  '--workbench-note-background-orange',
  '--workbench-note-background-red',
  '--workbench-note-background-magenta',
  '--workbench-note-background-purple',
  '--workbench-note-background-blue',
  '--workbench-note-background-teal',
  '--workbench-note-background-green',
  '--workbench-note-background-black',
  '--workbench-note-background-grey',
  '--workbench-note-background-white',
] as const;

export const NoteBackgroundColorsSchema = createZodUnion(
  NOTE_BACKGROUND_COLORS
);

export const DEFAULT_NOTE_BACKGROUND_COLOR = NOTE_BACKGROUND_COLORS[6];

export const NOTE_SHADOWS = [
  '',
  '--workbench-note-shadow-box',
  '--workbench-note-shadow-sticker',
  '--workbench-note-shadow-paper',
  '--workbench-note-shadow-float',
  `--workbench-note-shadow-film`,
] as const;

export const NoteShadowsSchema = createZodUnion(NOTE_SHADOWS);

export const DEFAULT_NOTE_SHADOW = NOTE_SHADOWS[2];
