import { Text } from '@maxiee/block_store';

export type RichTextCellType = Text | Text['yText'];
export const toYText = (text: RichTextCellType): Text['yText'] => {
  if (text instanceof Text) {
    return text.yText;
  }
  return text;
};
